'use strict';

const AVATAR_URL = `https://robohash.org/`;

const OFFER = {
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
};
const LOCATION = {
  MAX_X: 900,
  MIN_X: 300,
  MAX_Y: 900,
  MIN_Y: 150
};
const DATE_INTERVAL = -7;

const generateRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
const takeArrayElement = (array = []) => {
  return array[generateRandomNumber(array.length - 1, 0)];
};
const shuffleArray = (array) => {
  let newArray = array.slice()
    .sort(() => {
      return generateRandomNumber(1, 0);
    });
  return newArray;
};

const generateAvatar = () => {
  let randomString = Math.random().toString(36).substring(7);
  return `${AVATAR_URL}${randomString}`;
};
const generateFeatures = () => {
  let features = shuffleArray(OFFER.FEATURES);
  let newFeatures = [];
  for (const item of features) {
    if (generateRandomNumber(1, 0)) {
      newFeatures.push(item);
    }
  }
  return newFeatures;
};
const generateDate = () => {
  let date = new Date();
  let max = Date.now();
  let min = date.setDate(DATE_INTERVAL);
  return generateRandomNumber(max, min);
};

const generateEntity = (x = generateRandomNumber(LOCATION.MAX_X, LOCATION.MIN_X), y = generateRandomNumber(LOCATION.MAX_Y, LOCATION.MIN_Y)) => ({
  author: {
    avatar: generateAvatar()
  },
  offer: {
    title: takeArrayElement(OFFER.TITLE),
    addres: `${x}, ${y}`,
    price: generateRandomNumber(OFFER.MAX_PRICE, OFFER.MIN_PRICE),
    type: takeArrayElement(OFFER.TYPE),
    rooms: generateRandomNumber(OFFER.MAX_ROOMS, OFFER.MIN_ROOMS),
    guests: generateRandomNumber(OFFER.MAX_GUESTS, OFFER.MIN_GUESTS),
    checkin: takeArrayElement(OFFER.CHECKIN),
    checkout: takeArrayElement(OFFER.CHECKOUT),
    features: generateFeatures(),
    description: OFFER.DESCRIPTION,
    photos: shuffleArray(OFFER.PHOTOS)
  },
  location: {
    x: +x,
    y: +y,
  },
  date: generateDate()
});

module.exports = {
  generateEntity
};
