# Quản lý Vận Tải Hành Khách

## Mô Tả Dự Án

Dự án này là một hệ thống quản lý vận tải hành khách, cho phép người dùng quản lý thông tin về xe khách, bao gồm thêm, sửa, xóa và xem danh sách xe. Hệ thống sử dụng MongoDB cho cơ sở dữ liệu và Node.js với Express cho backend, trong khi React được sử dụng cho frontend.

## Các Tính Năng

- **Xem danh sách xe khách**: Người dùng có thể xem tất cả các xe khách đã được thêm vào hệ thống.
- **Thêm xe khách mới**: Người dùng có thể thêm thông tin về xe khách mới.
- **Cập nhật thông tin xe khách**: Người dùng có thể sửa thông tin của xe khách hiện có.
- **Xóa xe khách**: Người dùng có thể xóa xe khách khỏi danh sách.

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
