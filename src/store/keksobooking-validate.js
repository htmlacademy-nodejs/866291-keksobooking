'use strict';

const ValidationError = require(`../error/validation-error`);
const {VALID, REG_EXP} = require(`../data/constants`);
const {takeArrayElement} = require(`../data/randomValue`);

const errorThrow = (errors) => {
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
};

const checkMaxMin = (errors, object, objectName, max, min, isLength = false) => {
  const value = isLength ? object.length : object;
  const messageMax = isLength ? `длинее` : `больше`;
  const messageMin = isLength ? `короче` : `меньше`;
  if (value > max) {
    errors.push(`"${objectName}" ${messageMax} чем ${max}`);
  } else if (value < min) {
    errors.push(`"${objectName}" ${messageMin} чем ${min}`);
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

  checkMaxMin(errors, data.title, `title`, VALID.MAX_TITLE, VALID.MIN_TITLE, true);
  checkMaxMin(errors, data.price, `price`, VALID.MAX_PRICE, VALID.MIN_PRICE, false);
  checkMaxMin(errors, data.rooms, `rooms`, VALID.MAX_ROOMS, VALID.MIN_ROOMS, false);

  if (!VALID.TYPE.find((item) => item === data.type)) {
    errors.push(`"type" неверные данные`);
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


  if (!data.checkin.match(REG_EXP.TIME)) {
    errors.push(`"checkin" неверные данные`);
  }

  if (!data.checkout.match(REG_EXP.TIME)) {
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
