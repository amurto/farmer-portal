const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX';

async function getCoordsForAddress(address) {
  // return {
  //   lat: 40.7484474,
  //   lng: -73.9871516
  // };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;
  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;
  const address_components = data.results[0].address_components;
  let district, state, country;

  for (i of address_components) {
    if (i['types'][0] == "administrative_area_level_2") {
      district = i['long_name']
    } else if (i['types'][0] == "administrative_area_level_1") {
      state = i['long_name']
    } else if (i['types'][0] == "country") {
      country = i['long_name']
    }
  }
  return [coordinates, district, state, country];
}

module.exports = getCoordsForAddress;
