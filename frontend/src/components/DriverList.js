import React, { useEffect, useState } from "react";
import axios from "axios";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const res = await axios.get("http://localhost:4000/api/driver");
      setDrivers(res.data);
    };
    fetchDrivers();
  }, []);

  return (
    <div>
      <h1>Danh sách tài xế</h1>
      <ul>
        {drivers.map((driver) => (
          <li key={driver.cmt}>
            {driver.ten} - {driver.ma_so_bang_lai}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverList;
