import React, { useEffect, useState } from "react";
import axios from "axios";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({ bien_so: "", mau_xe: "" });
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
    setNewBus({ bien_so: "", mau_xe: "" });
  };

  // Hàm chọn xe để cập nhật
  const editBus = (bus) => {
    setSelectedBus(bus);
    setNewBus({ bien_so: bus.bien_so, mau_xe: bus.mau_xe });
  };

  // Hàm cập nhật xe khách
  const updateBus = async () => {
    const res = await axios.put(
      `http://localhost:4000/api/bus/${selectedBus.bien_so}`,
      newBus
    );
    setBuses(
      buses.map((bus) => (bus.bien_so === selectedBus.bien_so ? res.data : bus))
    );
    setNewBus({ bien_so: "", mau_xe: "" });
    setSelectedBus(null);
  };

  // Hàm xóa xe khách
  const deleteBus = async (_id) => {
    await axios.delete(`http://localhost:4000/api/bus/${_id}`);
    setBuses(buses.filter((bus) => bus._id !== _id));
  };

  return (
    <div>
      <h1>Danh sách xe khách</h1>
      <ul>
        {buses.map((bus) => (
          <li key={bus.bien_so}>
            {bus.bien_so} - {bus.mau_xe}
            <button onClick={() => editBus(bus)}>Sửa</button>
            <button onClick={() => deleteBus(bus._id)}>Xóa</button>
          </li>
        ))}
      </ul>

      <h2>{selectedBus ? "Cập nhật xe khách" : "Thêm xe khách mới"}</h2>
      <input
        type="text"
        placeholder="Biển số"
        value={newBus.bien_so}
        onChange={(e) => setNewBus({ ...newBus, bien_so: e.target.value })}
      />
      <input
        type="text"
        placeholder="Màu xe"
        value={newBus.mau_xe}
        onChange={(e) => setNewBus({ ...newBus, mau_xe: e.target.value })}
      />
      {selectedBus ? (
        <button onClick={updateBus}>Cập nhật</button>
      ) : (
        <button onClick={addBus}>Thêm</button>
      )}
    </div>
  );
};

export default BusList;
