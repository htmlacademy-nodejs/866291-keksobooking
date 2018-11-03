'use strict';

const ValidationError = require(`../error/validation-error`);
const {VALID} = require(`../data/keksobooking`);
const {takeArrayElement} = require(`../data/randomValue`);
const errorThrow = (errors) => {
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
};
const validate = (data) => {
  const errors = [];
  if (Object.keys(data).length === 0 || data.length === 0) {
    errors.push(`Пустая строка!`);
    throw new ValidationError(errors);
  }
  for (let item of VALID.FIELDS) {
    if (!data[item]) {
      errors.push(`Нужно поле "${item}"!`);
    }
  }
  errorThrow(errors);
  if (data.title.length > VALID.MAX_TITLE) {
    errors.push(`"title" длинее чем ${VALID.MAX_TITLE}`);
  } else if (data.title.length < VALID.MIN_TITLE) {
    errors.push(`"title" короче чем ${VALID.MIN_TITLE}`);
  }
  if (!VALID.TYPE.find((item) => item === data.type)) {
    errors.push(`"type" неверные данные`);
  }
  if (data.price > VALID.MAX_PRICE) {
    errors.push(`"price" больше чем ${VALID.MAX_TITLE}`);
  } else if (data.title < VALID.MIN_PRICE) {
    errors.push(`"price" меньше чем ${VALID.MIN_TITLE}`);
  }
  if (data.address) {
    const address = data.address.split(`, `);
    data.location = {
      "x": parseInt(address[0], 10),
      "y": parseInt(address[1], 10)
    };
  }
  if (data.address !== `${data.location.x}, ${data.location.y}`) {
    errors.push(`"address" неверные данные`);
  }
  if (data.address.length > VALID.MAX_ADDRESS) {
    errors.push(`"address" длинее чем ${VALID.MAX_ADDRESS}`);
  }
  if (data.price.rooms > VALID.MAX_TITLE) {
    errors.push(`"rooms" больше чем ${VALID.MAX_TITLE}`);
  } else if (data.title.rooms < VALID.MIN_TITLE) {
    errors.push(`"rooms" меньше чем ${VALID.MIN_TITLE}`);
  }
  if (!data.checkin.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i)) {
    errors.push(`"checkin" неверные данные`);
  }
  if (!data.checkout.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/i)) {
    errors.push(`"checkout" неверные данные`);
  }
  if (data.features) {
    if (!Array.isArray(data.features)) {
      data.features = [data.features];
    }
    for (let feature of data.features) {
      if (!VALID.FEATURES.find((item) => item === feature)) {
        errors.push(`"features" неверные данные`);
      }
    }
  }
  if (!data.name || data.name === ``) {
    data.name = takeArrayElement(VALID.NAME);
  }
  data.price = parseInt(data.price, 10);
  data.rooms = parseInt(data.rooms, 10);
  data.guests = parseInt(data.guests, 10);
  errorThrow(errors);
  return data;
};

module.exports = validate;