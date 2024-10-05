const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    ma_chuyen: { type: String, required: true },
    ma_tuyen: { type: String, ref: "Route" },
    bien_so: { type: String, ref: "Bus" },
    tai_xe: { type: String, ref: "Driver" },
    phu_xe: { type: String, ref: "Driver" },
    so_khach: { type: Number },
    gia_ve: { type: Number },
  },
  { collection: "Trip" }
);

module.exports = mongoose.model("Trip", TripSchema);
