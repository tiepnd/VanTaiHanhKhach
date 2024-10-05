const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema(
  {
    bien_so: { type: String, required: true },
    mau_xe: { type: String },
    hang_sx: { type: String },
    doi_xe: { type: Number },
    model: { type: String },
    so_ghe: { type: Number },
    nam_su_dung: { type: Number },
    ngay_bao_duong_cuoi: { type: Date },
  },
  { collection: "Bus" }
);

module.exports = mongoose.model("Bus", BusSchema);
