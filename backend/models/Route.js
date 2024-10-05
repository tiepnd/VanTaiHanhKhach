const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema(
  {
    ma_tuyen: { type: String, required: true },
    diem_dau: { type: String, required: true },
    diem_cuoi: { type: String, required: true },
    do_dai: { type: Number },
    do_phuc_tap: { type: Number },
  },
  { collection: "Route" }
);

module.exports = mongoose.model("Route", RouteSchema);
