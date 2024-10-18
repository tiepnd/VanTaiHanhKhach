# Quản lý Vận Tải Hành Khách

## Mô Tả Dự Án

Dự án xây dựng một hệ thống quản lý Hãng vận tải hành khách đường dài. Hệ thống bao gồm các chức năng quản lý thông tin về xe khách, tài xế, tuyến đường và chuyến xe. Ngoài ra, hệ thống phải cung cấp các chức năng truy vấn dữ liệu như tính lương tài xế, doanh thu của xe, và lịch bảo dưỡng xe.

## Các Tính Năng

### Quản lý xe khách

- **Xem danh sách xe khách**: Người dùng có thể xem tất cả các xe khách đã được thêm vào hệ thống.
- **Thêm xe khách mới**: Người dùng có thể thêm thông tin về xe khách mới.
- **Cập nhật thông tin xe khách**: Người dùng có thể sửa thông tin của xe khách hiện có.
- **Xóa xe khách**: Người dùng có thể xóa xe khách khỏi danh sách.

### Quản lý tài xế

- **Xem danh sách tài xế**: Người dùng có thể xem danh sách tất cả các tài xế hiện có trong hệ thống.
- **Thêm tài xế mới**: Người dùng có thể thêm thông tin về tài xế mới như tên, tuổi, bằng lái, số năm kinh nghiệm.
- **Cập nhật thông tin tài xế**: Người dùng có thể sửa thông tin của tài xế hiện có.
- **Xóa tài xế**: Người dùng có thể xóa tài xế khỏi danh sách.

### Quản lý tuyến đường

- **Xem danh sách tuyến đường**: Người dùng có thể xem danh sách các tuyến đường đã được đăng ký trong hệ thống.
- **Thêm tuyến đường mới**: Người dùng có thể thêm tuyến đường mới với thông tin như điểm xuất phát, điểm đến, khoảng cách.
- **Cập nhật thông tin tuyến đường**: Người dùng có thể sửa thông tin của tuyến đường.
- **Xóa tuyến đường**: Người dùng có thể xóa tuyến đường khỏi danh sách.

### Quản lý chuyến xe

- **Xem danh sách chuyến xe**: Người dùng có thể xem các chuyến xe đã lên lịch.
- **Thêm chuyến xe mới**: Người dùng có thể thêm thông tin về chuyến xe như xe sử dụng, tài xế, tuyến đường, thời gian khởi hành.
- **Cập nhật thông tin chuyến xe**: Người dùng có thể chỉnh sửa thông tin của chuyến xe hiện có.
- **Xóa chuyến xe**: Người dùng có thể xóa chuyến xe khỏi danh sách.

### Tính lương tài xế

- **Tính lương tài xế theo chuyến**: Hệ thống sẽ tính lương dựa trên số chuyến xe mà tài xế thực hiện, khoảng cách tuyến đường và hệ số lương.
- **Xem tổng lương tài xế**: Người dùng có thể xem tổng lương của một tài xế trong một khoảng thời gian nhất định.

### Doanh thu của xe

- **Tính doanh thu xe theo chuyến**: Hệ thống sẽ tính doanh thu dựa trên số vé bán được cho mỗi chuyến xe và giá vé.
- **Xem tổng doanh thu của xe**: Người dùng có thể xem tổng doanh thu của một xe trong một khoảng thời gian.

### Quản lý lịch bảo dưỡng

- **Xem lịch bảo dưỡng của xe**: Người dùng có thể xem thông tin về lịch bảo dưỡng của các xe trong hệ thống.
- **Thêm lịch bảo dưỡng**: Người dùng có thể thêm thông tin về lịch bảo dưỡng cho từng xe, bao gồm ngày dự kiến và nội dung bảo dưỡng.
- **Cập nhật lịch bảo dưỡng**: Người dùng có thể chỉnh sửa thông tin của lịch bảo dưỡng đã được lên kế hoạch.
- **Xóa lịch bảo dưỡng**: Người dùng có thể xóa lịch bảo dưỡng nếu không còn cần thiết.

## THIẾT KẾ CƠ SỞ DỮ LIỆU

### Mô tả chi tiết các bảng

1. **Bảng Bus (Thông tin xe khách)**:

   - `bien_so`: Kiểu String – Biển số xe.
   - `mau_xe`: Kiểu String – Màu xe.
   - `hang_sx`: Kiểu String – Hãng sản xuất xe.
   - `doi_xe`: Kiểu Number – Năm sản xuất.
   - `model`: Kiểu String – Mẫu xe.
   - `so_ghe`: Kiểu Number – Số lượng ghế ngồi.
   - `nam_su_dung`: Kiểu Number – Số năm sử dụng.
   - `ngay_bao_duong_cuoi`: Kiểu Date – Ngày bảo dưỡng cuối cùng.

2. **Bảng Driver (Thông tin tài xế)**:

   - `cmt`: Kiểu String – Chứng minh thư nhân dân.
   - `ten`: Kiểu String – Họ và tên tài xế.
   - `ma_so_bang_lai`: Kiểu String – Mã số bằng lái.
   - `loai_bang_lai`: Kiểu String – Loại bằng lái.
   - `dia_chi`: Kiểu String – Địa chỉ.
   - `ngay_sinh`: Kiểu Date – Ngày sinh.
   - `tham_nien`: Kiểu Number – Số năm kinh nghiệm.

3. **Bảng Route (Thông tin tuyến đường)**:

   - `ma_tuyen`: Kiểu ObjectId.
   - `diem_dau`: Kiểu String – Điểm đầu của tuyến.
   - `diem_cuoi`: Kiểu String – Điểm cuối của tuyến.
   - `do_dai`: Kiểu Number – Độ dài tuyến đường (km).
   - `do_phuc_tap`: Kiểu Number – Độ phức tạp của tuyến (1, 2, 3).

4. **Bảng Trip (Thông tin chuyến xe)**:
   - `ma_so_chuyen_xe`: Kiểu String – Mã số chuyến xe.
   - `ma_tuyen`: Kiểu ObjectId – Mã tuyến (liên kết đến bảng Route).
   - `bien_so`: Kiểu String – Biển số xe.
   - `tai_xe`: Kiểu ObjectId – Tài xế chính (liên kết đến bảng Driver).
   - `phu_xe`: Kiểu ObjectId – Phụ xe (liên kết đến bảng Driver).
   - `so_khach`: Kiểu Number – Số lượng khách trên chuyến.
   - `gia_ve`: Kiểu Number – Giá vé cho mỗi khách.

### Quan hệ giữa các bảng

- **Bus và Trip**: Mỗi chuyến xe sẽ sử dụng một chiếc xe cụ thể, và mỗi xe có thể tham gia nhiều chuyến.
- **Driver và Trip**: Một tài xế có thể tham gia nhiều chuyến, và một chuyến sẽ có một tài xế và một phụ xe.
- **Route và Trip**: Mỗi chuyến xe sẽ chạy trên một tuyến cụ thể, và mỗi tuyến có thể có nhiều chuyến.

### Sơ đồ ERD (Entity Relationship Diagram)

_(Bạn có thể đính kèm sơ đồ ERD ở đây nếu có sẵn)_

## Công Nghệ Sử Dụng

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB (Mongoose)

- **Frontend**:
  - React.js
  - Axios (để gọi API)

## Hướng Dẫn Cài Đặt

### Yêu Cầu

- Node.js (>= 14.x)
- MongoDB (cài đặt địa phương hoặc tài khoản MongoDB Atlas)

### Cài Đặt Backend

1. Clone repository về máy:
   git clone https://github.com/ndtiep/VanTaiHanhKhach.git
   cd VanTaiHanhKhach/backend
2. Cài đặt các phụ thuộc:
   npm install
   node app.js

### Cài Đặt Frontend

1. Clone repository về máy:
   git clone https://github.com/ndtiep/VanTaiHanhKhach.git
   cd VanTaiHanhKhach/frontend
2. Cài đặt các phụ thuộc:
   npm install
   npm start
