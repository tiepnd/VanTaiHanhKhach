import React from "react";
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import DashboardList from "./components/DashboardList";
import BusList from "./components/BusList";
import DriverList from "./components/DriverList";
import RouteList from "./components/RouteList";
import TripList from "./components/TripList";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
          <nav>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>
            <Link to="/">Dash board</Link>
          </li>
          <li>
            <Link to="/buses">Bus List</Link>
          </li>
          <li>
            <Link to="/drivers">Driver List</Link>
          </li>
          <li>
            <Link to="/routes">Route List</Link>
          </li>
          <li>
            <Link to="/trips">Trip List</Link>
          </li>
        </ul>
      </nav>
      <Routes>
      <Route path="/" element={<DashboardList />} />
        <Route path="/buses" element={<BusList />} />
        <Route path="/drivers" element={<DriverList />} />
        <Route path="/routes" element={<RouteList />} />
        <Route path="/trips" element={<TripList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
