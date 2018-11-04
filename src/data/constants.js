'use strict';

const {COMMAND} = require(`./constants/command`);
const {AVATAR_URL, LOCATION, DATE_INTERVAL, MAX_PORT, MIN_PORT} = require(`./constants/others`);
const {OFFER} = require(`./constants/offer`);
const {VALID} = require(`./constants/valid`);
const {DEFAULT_KEKSOBOOKING} = require(`./constants/default-keksobooking`);
const {REG_EXP} = require(`./constants/reg-exp`);
const {DB_NAME} = require(`./constants/db-name`);

module.exports = {
  COMMAND,
  AVATAR_URL,
  OFFER,
  LOCATION,
  DATE_INTERVAL,
  VALID,
  DEFAULT_KEKSOBOOKING,
  REG_EXP,
  MAX_PORT,
  MIN_PORT,
  DB_NAME
};
