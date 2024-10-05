const express = require("express");
const Route = require("../models/Route");
const router = express.Router();

// Lấy danh sách tất cả tuyến đường
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm một tuyến đường mới
router.post("/", async (req, res) => {
  const route = new Route(req.body);
  try {
    const newRoute = await route.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lấy thông tin chi tiết của một tuyến đường
router.get("/:id", async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route)
      return res.status(404).json({ message: "Tuyến đường không tồn tại" });
    res.json(route);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cập nhật thông tin tuyến đường
router.put("/:id", async (req, res) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRoute)
      return res.status(404).json({ message: "Tuyến đường không tồn tại" });
    res.json(updatedRoute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa một tuyến đường
router.delete("/:id", async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route)
      return res.status(404).json({ message: "Tuyến đường không tồn tại" });
    res.json({ message: "Tuyến đường đã được xóa" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;