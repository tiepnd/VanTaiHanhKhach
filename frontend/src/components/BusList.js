import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

const formatDate = (dateString) => {
  return format(new Date(dateString), "yyyy/MM/dd");
};

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({
    bien_so: "",
    mau_xe: "",
    hang_sx: "",
    model: "",
    doi_xe: "",
    nam_su_dung: "",
    so_ghe: "",
    ngay_bao_duong_cuoi: "",
  });
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    const fetchBuses = async () => {
      const res = await axios.get("http://localhost:4000/api/bus");
      setBuses(res.data);
    };
    fetchBuses();
  }, []);

  // Hàm thêm xe khách mới
  const addBus = async () => {
    const res = await axios.post("http://localhost:4000/api/bus", newBus);
    setBuses([...buses, res.data]);
    resetForm();
  };

  // Hàm chọn xe để cập nhật
  const editBus = (bus) => {
    setSelectedBus(bus);
    setNewBus({
      bien_so: bus.bien_so,
      mau_xe: bus.mau_xe,
      hang_sx: bus.hang_sx,
      model: bus.model,
      doi_xe: bus.doi_xe,
      nam_su_dung: bus.nam_su_dung,
      so_ghe: bus.so_ghe,
      ngay_bao_duong_cuoi: bus.ngay_bao_duong_cuoi,
    });
  };

  // Hàm cập nhật xe khách
  const updateBus = async () => {
    const res = await axios.put(
      `http://localhost:4000/api/bus/${selectedBus._id}`,
      newBus
    );
    setBuses(
      buses.map((bus) => (bus.bien_so === selectedBus.bien_so ? res.data : bus))
    );
    resetForm();
  };

  // Hàm xóa xe khách
  const deleteBus = async (_id) => {
    await axios.delete(`http://localhost:4000/api/bus/${_id}`);
    setBuses(buses.filter((bus) => bus._id !== _id));
  };

  const resetForm = () => {
    setNewBus({
      bien_so: "",
      mau_xe: "",
      hang_sx: "",
      model: "",
      doi_xe: "",
      nam_su_dung: "",
      so_ghe: "",
      ngay_bao_duong_cuoi: "",
    });
    setSelectedBus(null);
  };

  return (
    <div className="container">
      <h1>Danh sách xe khách</h1>
      <table>
        <thead>
          <tr>
            <th>Biển số</th>
            <th>Màu xe</th>
            <th>Hãng sản xuất</th>
            <th>Model</th>
            <th>Năm sản xuất</th>
            <th>Năm sử dụng</th>
            <th>Số ghế</th>
            <th>Ngày bảo dưỡng cuối</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            <tr key={bus.bien_so}>
              <td>{bus.bien_so}</td>
              <td>{bus.mau_xe}</td>
              <td>{bus.hang_sx}</td>
              <td>{bus.model}</td>
              <td>{bus.doi_xe}</td>
              <td>{bus.nam_su_dung}</td>
              <td>{bus.so_ghe}</td>
              <td>{formatDate(bus.ngay_bao_duong_cuoi)}</td>
              <td>
                <button onClick={() => editBus(bus)}>Sửa</button>
                <button onClick={() => deleteBus(bus._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{selectedBus ? "Cập nhật xe khách" : "Thêm xe khách mới"}</h2>
      <form className="form">
        <label>
          Biển số:
          <input
            type="text"
            value={newBus.bien_so}
            onChange={(e) => setNewBus({ ...newBus, bien_so: e.target.value })}
          />
        </label>
        <label>
          Màu xe:
          <input
            type="text"
            value={newBus.mau_xe}
            onChange={(e) => setNewBus({ ...newBus, mau_xe: e.target.value })}
          />
        </label>
        <label>
          Hãng sản xuất:
          <input
            type="text"
            value={newBus.hang_sx}
            onChange={(e) => setNewBus({ ...newBus, hang_sx: e.target.value })}
          />
        </label>
        <label>
          Model:
          <input
            type="text"
            value={newBus.model}
            onChange={(e) => setNewBus({ ...newBus, model: e.target.value })}
          />
        </label>
        <label>
          Năm sản xuất:
          <input
            type="text"
            value={newBus.doi_xe}
            onChange={(e) => setNewBus({ ...newBus, doi_xe: e.target.value })}
          />
        </label>
        <label>
          Năm sử dụng:
          <input
            type="number"
            value={newBus.nam_su_dung}
            onChange={(e) => setNewBus({ ...newBus, nam_su_dung: e.target.value })}
          />
        </label>
        <label>
          Số ghế:
          <input
            type="number"
            value={newBus.so_ghe}
            onChange={(e) => setNewBus({ ...newBus, so_ghe: e.target.value })}
          />
        </label>
        <label>
          Ngày bảo dưỡng cuối:
          <input
            type="date"
            value={newBus.ngay_bao_duong_cuoi}
            onChange={(e) => setNewBus({ ...newBus, ngay_bao_duong_cuoi: e.target.value })}
          />
        </label>
        <button type="button" onClick={selectedBus ? updateBus : addBus}>
          {selectedBus ? "Cập nhật" : "Thêm"}
        </button>
      </form>
    </div>
  );
};

export default BusList;