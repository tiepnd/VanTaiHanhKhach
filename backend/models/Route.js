const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
  diem_dau: { type: String, required: true },
  diem_cuoi: { type: String, required: true },
  do_dai: { type: Number },
  do_phuc_tap: { type: Number },
});

module.exports = mongoose.model("Route", RouteSchema);
