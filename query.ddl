db. Driver.aggregate([
      // Tìm các chuyến mà tài xế là tai_xe (chính)
      {
        $lookup: {
          from: "Trip",
          localField: "cmt", // CMT của tài xế
          foreignField: "tai_xe", // Tìm trong trường 'tai_xe' của Trip
          as: "trip_tai_xe",
        },
      },
      // Tìm các chuyến mà tài xế là phu_xe (phụ)
      {
        $lookup: {
          from: "Trip",
          localField: "cmt", // CMT của phụ xe
          foreignField: "phu_xe", // Tìm trong trường 'phu_xe' của Trip
          as: "trip_phu_xe",
        },
      },
      // Tìm thông tin tuyến đường của các chuyến mà tài xế là tai_xe (chính)
      {
        $lookup: {
          from: "Route",
          localField: "trip_tai_xe.ma_tuyen", // Mã tuyến từ các chuyến mà tài xế chính
          foreignField: "ma_tuyen", // Kết nối với mã tuyến của Route
          as: "route_info_tai_xe",
        },
      },
      // Tìm thông tin tuyến đường của các chuyến mà tài xế là phu_xe (phụ)
      {
        $lookup: {
          from: "Route",
          localField: "trip_phu_xe.ma_tuyen", // Mã tuyến từ các chuyến mà tài xế phụ
          foreignField: "ma_tuyen", // Kết nối với mã tuyến của Route
          as: "route_info_phu_xe",
        },
      },
      // Tính lương tài xế chính và tài xế phụ
      {
        $addFields: {
          // Nếu có chuyến thì tính lương dựa trên độ phức tạp của tuyến, nếu không thì lương = 0
          luong_tai_xe: {
            $cond: {
              if: { $gt: [{ $size: "$trip_tai_xe" }, 0] }, // Nếu có chuyến
              then: {
                $sum: {
                  $map: {
                    input: "$route_info_tai_xe", // Lấy độ phức tạp của các tuyến
                    as: "route",
                    in: { $multiply: ["$$route.do_phuc_tap", 150000, 2] }, // Lương tài xế = độ phức tạp * 150k * 2
                  },
                },
              },
              else: 0, // Nếu không có chuyến thì lương = 0
            },
          },
          // Tương tự cho phụ xe
          luong_phu_xe: {
            $cond: {
              if: { $gt: [{ $size: "$trip_phu_xe" }, 0] }, // Nếu có chuyến
              then: {
                $sum: {
                  $map: {
                    input: "$route_info_phu_xe", // Lấy độ phức tạp của các tuyến
                    as: "route",
                    in: { $multiply: ["$$route.do_phuc_tap", 150000] }, // Lương phụ xe = độ phức tạp * 150k
                  },
                },
              },
              else: 0, // Nếu không có chuyến thì lương = 0
            },
          },
        },
      },
      // Cộng lương tài xế chính và phụ xe lại
      {
        $addFields: {
          luong: { $add: ["$luong_tai_xe", "$luong_phu_xe"] },
        },
      },
      // Chỉ lấy những thông tin cần thiết
      {
        $project: {
          cmt: 1,
          ten: 1,
          luong: 1,
        },
      },
    ]);