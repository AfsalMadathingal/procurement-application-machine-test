const { getNames, getCode } = require('country-list');

// Get an array of country names
const countryNames = getNames();  // Returns an array of country names

// Example of validating a country name
const isCountryValid = (country) => countryNames.includes(country);
