const express = require("express");
const {
  getAvailableCountries,
  getCountryInfo,
} = require("../controllers/countryController");
const router = express.Router();

router.get("/", getAvailableCountries);

router.get("/:countryCode", getCountryInfo);

module.exports = router;
