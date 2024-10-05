import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusList from "./components/BusList";
import DriverList from "./components/DriverList";
import RouteList from "./components/RouteList";
import TripList from "./components/TripList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusList />} />
        <Route path="/drivers" element={<DriverList />} />
        <Route path="/routes" element={<RouteList />} />
        <Route path="/trips" element={<TripList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
