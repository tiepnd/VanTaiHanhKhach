import React, { useEffect, useState } from "react";
import axios from "axios";

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const res = await axios.get("http://localhost:4000/api/trip");
      setTrips(res.data);
    };
    fetchTrips();
  }, []);

  return (
    <div>
      <h1>Danh sách chuyến xe</h1>
      <ul>
        {trips.map((trip) => (
          <li key={trip.ma_so_chuyen_xe}>
            Chuyến: {trip.ma_so_chuyen_xe} - Tuyến: {trip.tuyen.diem_dau} đến{" "}
            {trip.tuyen.diem_cuoi}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;
