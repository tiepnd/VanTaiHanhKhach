import React, { useEffect, useState } from "react";
import axios from "axios";

const RouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({
    ma_tuyen: "",
    diem_dau: "",
    diem_cuoi: "",
    do_dai: "",
    do_phuc_tap: "",
  });
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      const res = await axios.get("http://localhost:4000/api/route");
      setRoutes(res.data);
    };
    fetchRoutes();
  }, []);

  // Hàm thêm tuyến đường mới
  const addRoute = async () => {
    const res = await axios.post("http://localhost:4000/api/route", newRoute);
    setRoutes([...routes, res.data]);
    resetForm();
  };

  // Hàm chọn tuyến đường để cập nhật
  const editRoute = (route) => {
    setSelectedRoute(route);
    setNewRoute({
      ma_tuyen: route.ma_tuyen,
      diem_dau: route.diem_dau,
      diem_cuoi: route.diem_cuoi,
      do_dai: route.do_dai,
      do_phuc_tap: route.do_phuc_tap,
    });
  };

  // Hàm cập nhật tuyến đường
  const updateRoute = async () => {
    const res = await axios.put(
      `http://localhost:4000/api/route/${selectedRoute._id}`,
      newRoute
    );
    setRoutes(
      routes.map((route) => (route._id === selectedRoute._id ? res.data : route))
    );
    resetForm();
  };

  // Hàm xóa tuyến đường
  const deleteRoute = async (id) => {
    await axios.delete(`http://localhost:4000/api/route/${id}`);
    setRoutes(routes.filter((route) => route._id !== id));
  };

  const resetForm = () => {
    setNewRoute({
      ma_tuyen: "",
      diem_dau: "",
      diem_cuoi: "",
      do_dai: "",
      do_phuc_tap: "",
    });
    setSelectedRoute(null);
  };

  return (
    <div className="container">
      <h1>Danh sách tuyến đường</h1>
      <table>
        <thead>
          <tr>
            <th>Mã tuyến</th>
            <th>Điểm đầu</th>
            <th>Điểm cuối</th>
            <th>Độ dài (km)</th>
            <th>Độ phức tạp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={route._id}>
              <td>{route.ma_tuyen}</td>
              <td>{route.diem_dau}</td>
              <td>{route.diem_cuoi}</td>
              <td>{route.do_dai} km</td>
              <td>{route.do_phuc_tap}</td>
              <td>
                <button onClick={() => editRoute(route)}>Sửa</button>
                <button onClick={() => deleteRoute(route._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{selectedRoute ? "Cập nhật tuyến đường" : "Thêm tuyến đường mới"}</h2>
      <form className="form">
        <label>
          Mã tuyến:
          <input
            type="text"
            value={newRoute.ma_tuyen}
            onChange={(e) => setNewRoute({ ...newRoute, ma_tuyen: e.target.value })}
          />
        </label>
        <label>
          Điểm đầu:
          <input
            type="text"
            value={newRoute.diem_dau}
            onChange={(e) => setNewRoute({ ...newRoute, diem_dau: e.target.value })}
          />
        </label>
        <label>
          Điểm cuối:
          <input
            type="text"
            value={newRoute.diem_cuoi}
            onChange={(e) => setNewRoute({ ...newRoute, diem_cuoi: e.target.value })}
          />
        </label>
        <label>
          Độ dài (km):
          <input
            type="number"
            value={newRoute.do_dai}
            onChange={(e) => setNewRoute({ ...newRoute, do_dai: e.target.value })}
          />
        </label>
        <label>
          Độ phức tạp:
          <input
            type="text"
            value={newRoute.do_phuc_tap}
            onChange={(e) => setNewRoute({ ...newRoute, do_phuc_tap: e.target.value })}
          />
        </label>
        <label></label>
        <button
          type="button"
          onClick={selectedRoute ? updateRoute : addRoute}
        >
          {selectedRoute ? "Cập nhật" : "Thêm"}
        </button>
      </form>
    </div>
  );
};

export default RouteList;
