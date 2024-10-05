const express = require("express");
const Route = require("../models/Route");
const router = express.Router();

// Lấy danh sách tuyến đường
router.get("/", async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm tuyến đường mới
router.post("/", async (req, res) => {
  const route = new Route(req.body);
  try {
    const newRoute = await route.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
