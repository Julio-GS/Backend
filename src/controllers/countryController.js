const axios = require("axios");

// Endpoint to get available countries
const getAvailableCountries = async (req, res) => {
  try {
    const response = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Endpoint to get detailed country info
const getCountryInfo = async (req, res) => {
  const { countryCode } = req.params;
  console.log("countryCode", countryCode);
  try {
    // Get country borders
    const countryInfoResponse = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
    );
    const borders = countryInfoResponse.data.borders || [];

    console.log("countryInfoResponse", countryInfoResponse.data);
    // Get country population data
    const populationResponse = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/population",
      {
        country: countryInfoResponse.data.commonName,
      }
    );

    // Get country flag
    const flagResponse = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/flag/images",
      {
        country: countryInfoResponse.data.commonName,
      }
    );

    // Build response data
    const countryData = {
      name: countryInfoResponse.data.commonName,
      borders,
      population: populationResponse.data.populationCounts,
      flag: flagResponse.data.data.flag,
    };

    res.json(countryData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching country info", error: error.message });
  }
};

module.exports = { getAvailableCountries, getCountryInfo };
