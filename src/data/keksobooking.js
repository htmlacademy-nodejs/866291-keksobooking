'use strict';

module.exports = {
  AVATAR_URL: `https://robohash.org/`,
  OFFER: {
    TITLE: [
      `Большая уютная квартира`,
      `Маленькая неуютная квартира`,
      `Огромный прекрасный дворец`,
      `Маленький ужасный дворец`,
      `Красивый гостевой домик`,
      `Некрасивый негостеприимный домик`,
      `Уютное бунгало далеко от моря`,
      `Неуютное бунгало по колено в воде`],
    MAX_PRICE: 1000000,
    MIN_PRICE: 1000,
    TYPE: [
      `flat`,
      `palace`,
      `house `,
      `bungalo`,
    ],
    MAX_ROOMS: 5,
    MIN_ROOMS: 1,
    MAX_GUESTS: 1000,
    MIN_GUESTS: 0,
    CHECKIN: [
      `12:00`,
      `13:00`,
      `14:00`
    ],
    CHECKOUT: [
      `12:00`,
      `13:00`,
      `14:00`
    ],
    FEATURES: [
      `wifi`,
      `dishwasher`,
      `parking`,
      `washer`,
      `elevator`,
      `conditioner`
    ],
    DESCRIPTION: ``,
    PHOTOS: [
      `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel3.jpg`]
  },
  LOCATION: {
    MAX_X: 900,
    MIN_X: 300,
    MAX_Y: 900,
    MIN_Y: 150
  },
  DATE_INTERVAL: -7
};
