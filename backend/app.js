require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/bus", require("./routes/bus"));
app.use("/api/driver", require("./routes/driver"));
app.use("/api/route", require("./routes/route"));
app.use("/api/trip", require("./routes/trip"));
app.use("/api/dashboard", require("./routes/dashboard"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
