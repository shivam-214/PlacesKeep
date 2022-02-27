const axios = require("axios");
const httpError = require("../models/http-error");

const ACCESS_TOKEN =
  "pk.eyJ1Ijoic2hpdmFtLTIxNCIsImEiOiJjbDA0eXN1anMwanI4M2Nxd2U4cmthaTdmIn0.dG_tl0WkmBFP3K32TlEr5A";
// const API_KEY = "QEWebmTB8hQukiGayFs_kjIOGHBJ92-fM35XyKrow-w"; //API_KEY for "hereapi" geocoding

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${ACCESS_TOKEN}`
  );

  const responseData = response.data; // Data Recieved from here geocoding api
  if (!response.status === 200 || !responseData) {
    const error = new httpError(
      "Could not find the request for the specified address.",
      422
    );
    throw error;
  }

  const lng = responseData.features[0].center[0];
  const lat = responseData.features[0].center[1];
  return { lat, lng };
}

module.exports = getCoordsForAddress;
