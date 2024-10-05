db.Trip.aggregate([
    // Bước 1: Kết nối với collection "Route" để lấy thông tin tuyến
    {
        $lookup: {
            from: "Route",            // Collection cần kết nối
            localField: "ma_tuyen",   // Trường trong collection Trip
            foreignField: "ma_tuyen",  // Trường trong collection Route
            as: "tuyen_info"          // Tên trường mới cho kết quả
        }
    },
    { $unwind: "$tuyen_info" }, // Chuyển đổi mảng tuyên_info thành đối tượng

    // Bước 2: Kết nối với collection "Driver" để lấy thông tin tài xế
    {
        $lookup: {
            from: "Driver",          // Collection cần kết nối
            localField: "tai_xe",    // Trường trong collection Trip
            foreignField: "cmt",      // Trường trong collection Driver
            as: "tai_xe_info"        // Tên trường mới cho kết quả
        }
    },
    { $unwind: "$tai_xe_info" }, // Chuyển đổi mảng tai_xe_info thành đối tượng

    // Bước 3: Kết nối với collection "Driver" để lấy thông tin phụ xe
    {
        $lookup: {
            from: "Driver",          // Collection cần kết nối
            localField: "phu_xe",    // Trường trong collection Trip
            foreignField: "cmt",      // Trường trong collection Driver
            as: "phu_xe_info"        // Tên trường mới cho kết quả
        }
    },
    { $unwind: "$phu_xe_info" }, // Chuyển đổi mảng phu_xe_info thành đối tượng

    // Bước 4: Chọn các trường cần thiết cho kết quả
    {
        $project: {
            "tuyen_info.do_phuc_tap": 1, // Giữ lại độ phức tạp của tuyến
            "tai_xe_info.cmt": 1,        // Giữ lại CMT tài xế
            "tai_xe_info.ten": 1,        // Giữ lại tên tài xế
            "phu_xe_info.cmt": 1,        // Giữ lại CMT phụ xe
            "phu_xe_info.ten": 1         // Giữ lại tên phụ xe
        }
    },

    // Bước 5: Tính lương cho tài xế và phụ xe
    {
        $addFields: {
            luong_tai_xe: {
                $multiply: ["$tuyen_info.do_phuc_tap", 150000, 2] // Tính lương tài xế
            },
            luong_phu_xe: {
                $multiply: ["$tuyen_info.do_phuc_tap", 150000] // Tính lương phụ xe
            }
        }
    },

    // Bước 6: Tạo hai nhánh để xử lý kết quả cho tài xế và phụ xe
    {
        $facet: {
            tai_xe: [
                { $match: { luong_tai_xe: { $exists: true } } }, // Lọc các tài xế có lương
                {
                    $project: {
                        "cmt": "$tai_xe_info.cmt", // Đổi tên trường CMT
                        "ten": "$tai_xe_info.ten", // Đổi tên trường tên
                        "luong": "$luong_tai_xe"   // Giữ lại lương tài xế
                    }
                }
            ],
            phu_xe: [
                { $match: { luong_phu_xe: { $exists: true } } }, // Lọc các phụ xe có lương
                {
                    $project: {
                        "cmt": "$phu_xe_info.cmt", // Đổi tên trường CMT
                        "ten": "$phu_xe_info.ten", // Đổi tên trường tên
                        "luong": "$luong_phu_xe"   // Giữ lại lương phụ xe
                    }
                }
            ]
        }
    },

    // Bước 7: Kết hợp kết quả tài xế và phụ xe lại thành một mảng
    {
        $project: {
            results: { $concatArrays: ["$tai_xe", "$phu_xe"] } // Kết hợp hai mảng
        }
    },
    { $unwind: "$results" }, // Tách mảng kết quả thành các tài liệu riêng biệt
    { $replaceRoot: { newRoot: "$results" } }, // Đặt lại cấu trúc để kết quả dễ hiểu hơn

    // Bước 8: Nhóm lại theo CMT để tính tổng lương
    {
        $group: {
            _id: "$cmt",              // Nhóm theo trường CMT
            cmt: { $first: "$cmt" }, // Giữ lại giá trị CMT
            ten: { $first: "$ten" }, // Giữ lại tên
            luong: { $sum: "$luong" } // Tính tổng lương
        }
    }
])




