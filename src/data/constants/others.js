'use strict';

const AVATAR_URL = `https://robohash.org/`;

const LOCATION = {
  MAX_X: 900,
  MIN_X: 300,
  MAX_Y: 500,
  MIN_Y: 150
};

const DATE_INTERVAL = -7;
const MAX_PORT = 49151;
const MIN_PORT = 1024;

module.exports = {
  AVATAR_URL,
  LOCATION,
  DATE_INTERVAL,
  MAX_PORT,
  MIN_PORT
};
