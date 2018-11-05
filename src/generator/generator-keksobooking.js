'use strict';

const {AVATAR_URL, OFFER, LOCATION, DATE_INTERVAL, VALID} = require(`../data/constants`);
const {generateRandomNumber, takeArrayElement, shuffleArray} = require(`../data/randomValue`);

const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  result = Date.UTC(result.getUTCFullYear(), result.getUTCMonth(), result.getUTCDate(),
      result.getUTCHours(), result.getUTCMinutes(), result.getUTCSeconds(), result.getUTCMilliseconds());
  return result;
};

const generateAvatar = () => {
  const randomString = Math.random().toString(36).substring(7);
  return `${AVATAR_URL}${randomString}`;
};
const generateFeatures = () => {
  const features = shuffleArray(OFFER.FEATURES);
  const newFeatures = [];
  for (const item of features) {
    if (generateRandomNumber(1, 0)) {
      newFeatures.push(item);
    }
  }
  return newFeatures;
};
const generateDate = () => {
  const max = Date.now();
  const min = addDays(max, DATE_INTERVAL);
  return generateRandomNumber(max, min);
};

const generateEntity = (x = generateRandomNumber(LOCATION.MAX_X, LOCATION.MIN_X), y = generateRandomNumber(LOCATION.MAX_Y, LOCATION.MIN_Y)) => ({
  author: {
    name: takeArrayElement(VALID.NAME),
    avatar: generateAvatar()
  },
  offer: {
    title: takeArrayElement(OFFER.TITLE),
    address: `${x}, ${y}`,
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
    x: parseInt(x, 10),
    y: parseInt(y, 10),
  },
  date: generateDate()
});

module.exports = {
  generateEntity
};
