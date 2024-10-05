const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  ma_so_chuyen_xe: { type: String, required: true },
  tuyen: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  tai_xe: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  phu_xe: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  so_khach: { type: Number },
  gia_ve: { type: Number },
});

module.exports = mongoose.model("Trip", TripSchema);
