const NodeGeocoder = require("node-geocoder");
const envConfig = require("kvell-scripts/config");

const options = {
  provider: envConfig.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: envConfig.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
