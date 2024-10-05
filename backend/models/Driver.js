const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
  cmt: { type: String, required: true },
  ten: { type: String, required: true },
  ma_so_bang_lai: { type: String, required: true },
  loai_bang_lai: { type: String },
  dia_chi: { type: String },
  ngay_sinh: { type: Date },
  tham_nien: { type: Number },
});

module.exports = mongoose.model("Driver", DriverSchema);
