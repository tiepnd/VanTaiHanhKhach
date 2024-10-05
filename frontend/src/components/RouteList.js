import React, { useEffect, useState } from "react";
import axios from "axios";

const RouteList = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const res = await axios.get("http://localhost:4000/api/route");
      setRoutes(res.data);
    };
    fetchRoutes();
  }, []);

  return (
    <div>
      <h1>Danh sách tuyến đường</h1>
      <ul>
        {routes.map((route) => (
          <li key={route._id}>
            {route.diem_dau} - {route.diem_cuoi}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RouteList;
