const express = require("express");
const Bus = require("../models/Bus");
const router = express.Router();

// Lấy danh sách xe khách
router.get("/", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm xe khách mới
router.post("/", async (req, res) => {
  const bus = new Bus(req.body);
  try {
    const newBus = await bus.save();
    res.status(201).json(newBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật thông tin xe khách theo ID
router.put("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    // Cập nhật các trường trong bus
    Object.assign(bus, req.body);

    const updatedBus = await bus.save();
    res.json(updatedBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa xe khách theo ID
router.delete("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    await Bus.findByIdAndDelete(req.params.id);
    res.json({ message: "Bus deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy thông tin xe khách theo ID
router.get("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
