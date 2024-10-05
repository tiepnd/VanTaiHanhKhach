import React, { useEffect, useState } from "react";
import axios from "axios";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState({
    ma_chuyen: "",
    ma_tuyen: "",
    gia_ve: "",
    so_khach: "",
    bien_so: "",
  });
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      const res = await axios.get("http://localhost:4000/api/trip");
      setTrips(res.data);
    };
    fetchTrips();
  }, []);

  // Hàm thêm chuyến xe mới
  const addTrip = async () => {
    const res = await axios.post("http://localhost:4000/api/trip", newTrip);
    setTrips([...trips, res.data]);
    resetForm();
  };

  // Hàm chọn chuyến xe để cập nhật
  const editTrip = (trip) => {
    setSelectedTrip(trip);
    setNewTrip({
      ma_chuyen: trip.ma_chuyen,
      ma_tuyen: trip.ma_tuyen,
      gia_ve: trip.gia_ve,
      so_khach: trip.so_khach,
      bien_so: trip.bien_so,
    });
  };

  // Hàm cập nhật chuyến xe
  const updateTrip = async () => {
    const res = await axios.put(
      `http://localhost:4000/api/trip/${selectedTrip._id}`,
      newTrip
    );
    setTrips(
      trips.map((trip) => (trip._id === selectedTrip._id ? res.data : trip))
    );
    resetForm();
  };

  // Hàm xóa chuyến xe
  const deleteTrip = async (id) => {
    await axios.delete(`http://localhost:4000/api/trip/${id}`);
    setTrips(trips.filter((trip) => trip._id !== id));
  };

  const resetForm = () => {
    setNewTrip({
      ma_chuyen: "",
      ma_tuyen: "",
      gia_ve: "",
      so_khach: "",
      bien_so: "",
    });
    setSelectedTrip(null);
  };

  return (
    <div className="container">
      <h1>Danh sách chuyến xe</h1>
      <table>
        <thead>
          <tr>
            <th>Mã chuyến</th>
            <th>Mã tuyến</th>
            <th>Giá vé</th>
            <th>Số khách</th>
            <th>Biển số</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip._id}>
              <td>{trip.ma_chuyen}</td>
              <td>{trip.ma_tuyen}</td>
              <td>{trip.gia_ve}</td>
              <td>{trip.so_khach}</td>
              <td>{trip.bien_so}</td>
              <td>
                <button onClick={() => editTrip(trip)}>Sửa</button>
                <button onClick={() => deleteTrip(trip._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{selectedTrip ? "Cập nhật chuyến xe" : "Thêm chuyến xe mới"}</h2>
      <form className="form">
        <label>
          Mã chuyến:
          <input
            type="text"
            value={newTrip.ma_chuyen}
            onChange={(e) => setNewTrip({ ...newTrip, ma_chuyen: e.target.value })}
          />
        </label>
        <label>
          Mã tuyến:
          <input
            type="text"
            value={newTrip.ma_tuyen}
            onChange={(e) => setNewTrip({ ...newTrip, ma_tuyen: e.target.value })}
          />
        </label>
        <label>
          Giá vé:
          <input
            type="number"
            value={newTrip.gia_ve}
            onChange={(e) => setNewTrip({ ...newTrip, gia_ve: e.target.value })}
          />
        </label>
        <label>
          Số khách:
          <input
            type="number"
            value={newTrip.so_khach}
            onChange={(e) => setNewTrip({ ...newTrip, so_khach: e.target.value })}
          />
        </label>
        <label>
          Biển số:
          <input
            type="text"
            value={newTrip.bien_so}
            onChange={(e) => setNewTrip({ ...newTrip, bien_so: e.target.value })}
          />
        </label>
        <label>

        </label>
        <button
          type="button"
          onClick={selectedTrip ? updateTrip : addTrip}
        >
          {selectedTrip ? "Cập nhật" : "Thêm"}
        </button>
      </form>
    </div>
  );
};

export default TripList;