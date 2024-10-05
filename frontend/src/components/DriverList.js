import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const formatDate = (dateString) => {
  return format(new Date(dateString), "yyyy/MM/dd");
};

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({
    cmt: "",
    ten: "",
    dia_chi: "",
    loai_bang_lai: "",
    ma_bang_lai: "",
    ngay_sinh: "",
    tham_nien: "",
  });
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      const res = await axios.get("http://localhost:4000/api/driver");
      setDrivers(res.data);
    };
    fetchDrivers();
  }, []);

  // Hàm thêm tài xế mới
  const addDriver = async () => {
    const res = await axios.post("http://localhost:4000/api/driver", newDriver);
    setDrivers([...drivers, res.data]);
    resetForm();
  };

  // Hàm chọn tài xế để cập nhật
  const editDriver = (driver) => {
    setSelectedDriver(driver);
    setNewDriver({
      cmt: driver.cmt,
      ten: driver.ten,
      dia_chi: driver.dia_chi,
      loai_bang_lai: driver.loai_bang_lai,
      ma_bang_lai: driver.ma_bang_lai,
      ngay_sinh: driver.ngay_sinh,
      tham_nien: driver.tham_nien,
    });
  };

  // Hàm cập nhật tài xế
  const updateDriver = async () => {
    const res = await axios.put(
      `http://localhost:4000/api/driver/${selectedDriver._id}`,
      newDriver
    );
    setDrivers(
      drivers.map((driver) =>
        driver.cmt === selectedDriver.cmt ? res.data : driver
      )
    );
    resetForm();
  };

  // Hàm xóa tài xế
  const deleteDriver = async (id) => {
    await axios.delete(`http://localhost:4000/api/driver/${id}`);
    setDrivers(drivers.filter((driver) => driver._id !== id));
  };

  const resetForm = () => {
    setNewDriver({
      ten: "",
      dia_chi: "",
      loai_bang_lai: "",
      ma_bang_lai: "",
      ngay_sinh: "",
      tham_nien: "",
    });
    setSelectedDriver(null);
  };

  return (
    <div className="container">
      <h1>Danh sách tài xế</h1>
      <table>
        <thead>
          <tr>
            <th>CMT</th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>Loại bằng lái</th>
            <th>Mã bằng lái</th>
            <th>Ngày sinh</th>
            <th>Thâm niên (năm)</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.cmt}>
              <td>{driver.cmt}</td>
              <td>{driver.ten}</td>
              <td>{driver.dia_chi}</td>
              <td>{driver.loai_bang_lai}</td>
              <td>{driver.ma_bang_lai}</td>
              <td>{formatDate(driver.ngay_sinh)}</td>
              <td>{driver.tham_nien}</td>
              <td>
                <button onClick={() => editDriver(driver)}>Sửa</button>
                <button onClick={() => deleteDriver(driver._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{selectedDriver ? "Cập nhật tài xế" : "Thêm tài xế mới"}</h2>
      <form className="form">
        <label>
          CMT:
          <input
            type="text"
            value={newDriver.cmt}
            onChange={(e) =>
              setNewDriver({ ...newDriver, cmt: e.target.value })
            }
          />
        </label>
        <label>
          Tên:
          <input
            type="text"
            value={newDriver.ten}
            onChange={(e) =>
              setNewDriver({ ...newDriver, ten: e.target.value })
            }
          />
        </label>
        <label>
          Địa chỉ:
          <input
            type="text"
            value={newDriver.dia_chi}
            onChange={(e) =>
              setNewDriver({ ...newDriver, dia_chi: e.target.value })
            }
          />
        </label>
        <label>
          Loại bằng lái:
          <input
            type="text"
            value={newDriver.loai_bang_lai}
            onChange={(e) =>
              setNewDriver({ ...newDriver, loai_bang_lai: e.target.value })
            }
          />
        </label>
        <label>
          Mã bằng lái:
          <input
            type="text"
            value={newDriver.ma_bang_lai}
            onChange={(e) =>
              setNewDriver({ ...newDriver, ma_bang_lai: e.target.value })
            }
          />
        </label>
        <label>
          Ngày sinh:
          <input
            type="date"
            value={newDriver.ngay_sinh}
            onChange={(e) =>
              setNewDriver({ ...newDriver, ngay_sinh: e.target.value })
            }
          />
        </label>
        <label>
          Thâm niên (năm):
          <input
            type="number"
            value={newDriver.tham_nien}
            onChange={(e) =>
              setNewDriver({ ...newDriver, tham_nien: e.target.value })
            }
          />
        </label>
        <label>

        </label>
        <button
          type="button"
          onClick={selectedDriver ? updateDriver : addDriver}
        >
          {selectedDriver ? "Cập nhật" : "Thêm"}
        </button>
      </form>
    </div>
  );
};

export default DriverList;
