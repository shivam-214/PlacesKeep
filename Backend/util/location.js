const axios = require("axios");
const httpError = require("../models/http-error");

const API_KEY = "QEWebmTB8hQukiGayFs_kjIOGHBJ92-fM35XyKrow-w"; //API_KEY for "hereapi" geocoding

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
      address
    )}&apikey=${API_KEY}`
  );

  const responseData = response.data;
  if (!response.status === 200 || !responseData) {
    const error = new httpError(
      "Could not find the request for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = responseData.items[0].position;
  return coordinates;
}

module.exports = getCoordsForAddress;
