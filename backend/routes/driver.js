const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");

// Lấy danh sách tất cả tài xế
router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm một tài xế mới
router.post("/", async (req, res) => {
  const driver = new Driver(req.body);
  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy thông tin chi tiết của một tài xế
router.get("/:id", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver)
      return res.status(404).json({ message: "Tài xế không tồn tại" });
    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật thông tin tài xế
router.put("/:id", async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa một tài xế
router.delete("/:id", async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: "Tài xế đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
