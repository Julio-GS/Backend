const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const countryRoutes = require("./routes/countryRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/api/countries", countryRoutes);

module.exports = app;
