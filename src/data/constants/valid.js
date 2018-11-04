'use strict';

const VALID = {
  FIELDS: [
    `title`,
    `type`,
    `price`,
    `address`,
    `checkin`,
    `checkout`,
    `rooms`
  ],
  MAX_TITLE: 140,
  MIN_TITLE: 30,
  TYPE: [
    `flat`,
    `palace`,
    `house`,
    `bungalo`,
  ],
  MAX_PRICE: 100000,
  MIN_PRICE: 1,
  MAX_ADDRESS: 100,
  MAX_ROOMS: 1000,
  MIN_ROOMS: 0,
  FEATURES: [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`
  ],
  JPG: `image/jpg`,
  PNG: `image/png`,
  NAME: [
    `Keks`,
    `Pavel`,
    `Nikolay`,
    `Alex`,
    `Ulyana`,
    `Anastasyia`,
    `Julia`
  ]

};

module.exports = {
  VALID
};
