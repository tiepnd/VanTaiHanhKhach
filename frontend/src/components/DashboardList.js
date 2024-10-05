import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardList = () => {
  const [driversSalaries, setDriversSalaries] = useState([]);
  const [busesRevenue, setBusesRevenue] = useState([]);
  const [busesMaintenanceDue, setBusesMaintenanceDue] = useState([]);
  const [busesOverdueMaintenance, setBusesOverdueMaintenance] = useState([]);

  useEffect(() => {
    const fetchDriversSalaries = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/dashboard/drivers-salaries"
        );
        setDriversSalaries(res.data);
      } catch (error) {
        console.error("Error fetching driver salaries:", error);
      }
    };

    const fetchBusesRevenue = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/dashboard/buses-revenue"
        );
        setBusesRevenue(res.data);
      } catch (error) {
        console.error("Error fetching buses revenue:", error);
      }
    };

    const fetchBusesMaintenanceDue = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/dashboard/buses-maintenance-due"
        );
        setBusesMaintenanceDue(res.data);
      } catch (error) {
        console.error("Error fetching buses maintenance due:", error);
      }
    };

    const fetchBusesOverdueMaintenance = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/dashboard/buses-overdue-maintenance"
        );
        setBusesOverdueMaintenance(res.data);
      } catch (error) {
        console.error("Error fetching buses overdue maintenance:", error);
      }
    };

    fetchDriversSalaries();
    fetchBusesRevenue();
    fetchBusesMaintenanceDue();
    fetchBusesOverdueMaintenance();
  }, []);

  return (
    <div className="container">
      <h2>Danh sách tài xế và lương tháng</h2>
      <table>
        <thead>
          <tr>
            <th>CMT</th>
            <th>Tên</th>
            <th>Lương</th>
          </tr>
        </thead>
        <tbody>
          {driversSalaries.map((driver) => (
            <tr key={driver.cmt}>
              <td>{driver.cmt}</td>
              <td>{driver.ten}</td>
              <td>{driver.luong}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Danh sách xe và doanh thu</h2>
      <table>
        <thead>
          <tr>
            <th>Biển số</th>
            <th>Doanh thu</th>
            <th>Màu xe</th>
            <th>Hãng sản xuất</th>
          </tr>
        </thead>
        <tbody>
          {busesRevenue.map((bus) => (
            <tr key={bus.bien_so}>
              <td>{bus.bien_so}</td>
              <td>{bus.doanh_thu}</td>
              <td>{bus.mau_xe}</td>
              <td>{bus.hang_sx}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Danh sách xe cùng ngày bảo dưỡng tiếp theo</h2>
      <table>
        <thead>
          <tr>
            <th>Biển số</th>
            <th>Màu xe</th>
            <th>Hãng sản xuất</th>
            <th>Ngày bảo dưỡng tiếp theo</th>
          </tr>
        </thead>
        <tbody>
          {busesMaintenanceDue.map((bus) => (
            <tr key={bus.bien_so}>
              <td>{bus.bien_so}</td>
              <td>{bus.mau_xe}</td>
              <td>{bus.hang_sx}</td>
              <td>
                {new Date(bus.ngay_bao_duong_tiep_theo).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Danh sách xe quá hạn bảo dưỡng</h2>
      <table>
        <thead>
          <tr>
            <th>Biển số</th>
            <th>Màu xe</th>
            <th>Hãng sản xuất</th>
            <th>Ngày bảo dưỡng tiếp theo</th>
          </tr>
        </thead>
        <tbody>
          {busesOverdueMaintenance.map((bus) => (
            <tr key={bus.bien_so}>
              <td>{bus.bien_so}</td>
              <td>{bus.mau_xe}</td>
              <td>{bus.hang_sx}</td>
              <td>
                {new Date(bus.ngay_bao_duong_tiep_theo).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardList;
