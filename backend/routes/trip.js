const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

// Lấy danh sách tất cả chuyến xe
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm một chuyến xe mới
router.post("/", async (req, res) => {
  const trip = new Trip(req.body);
  try {
    const newTrip = await trip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy thông tin chi tiết của một chuyến xe
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip)
      return res.status(404).json({ message: "Chuyến xe không tồn tại" });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật thông tin chuyến xe
router.put("/:id", async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa một chuyến xe
router.delete("/:id", async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: "Chuyến xe đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
