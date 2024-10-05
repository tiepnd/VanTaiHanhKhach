const express = require("express");
const Trip = require("../models/Trip");
const Driver = require("../models/Driver");
const Bus = require("../models/Bus");
const router = express.Router();

// Lấy lương tài xế và phụ xe, kể cả những người không có chuyến
router.get("/drivers-salaries", async (req, res) => {
  try {
    const results = await Driver.aggregate([
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

    // Trả về kết quả
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy danh sách xe và doanh thu của mỗi xe
router.get("/buses-revenue", async (req, res) => {
  try {
    const results = await Trip.aggregate([
      {
        $group: {
          _id: "$bien_so",
          doanh_thu: { $sum: { $multiply: ["$so_khach", "$gia_ve"] } },
        },
      },
      {
        $lookup: {
          from: "Bus",
          localField: "_id",
          foreignField: "bien_so",
          as: "bus_info",
        },
      },
      { $unwind: "$bus_info" },
      {
        $project: {
          bien_so: "$_id",
          doanh_thu: 1,
          mau_xe: "$bus_info.mau_xe",
          hang_sx: "$bus_info.hang_sx",
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy danh sách xe cùng ngày bảo dưỡng tiếp theo
router.get("/buses-maintenance-due", async (req, res) => {
  try {
    const results = await Bus.aggregate([
      {
        $addFields: {
          ngay_bao_duong_tiep_theo: {
            $add: [
              "$ngay_bao_duong_cuoi",
              { $multiply: [360, 24 * 60 * 60 * 1000] }, // Cộng thêm 360 ngày
            ],
          },
        },
      },
      {
        $project: {
          bien_so: 1,
          mau_xe: 1,
          hang_sx: 1,
          ngay_bao_duong_tiep_theo: 1,
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy danh sách xe quá hạn bảo dưỡng
router.get("/buses-overdue-maintenance", async (req, res) => {
  try {
    const results = await Bus.aggregate([
      {
        $addFields: {
          ngay_bao_duong_tiep_theo: {
            $add: [
              "$ngay_bao_duong_cuoi",
              { $multiply: [360, 24 * 60 * 60 * 1000] }, // Cộng thêm 360 ngày
            ],
          },
        },
      },
      {
        $match: {
          ngay_bao_duong_tiep_theo: { $lt: new Date() }, // Lọc xe quá hạn
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
