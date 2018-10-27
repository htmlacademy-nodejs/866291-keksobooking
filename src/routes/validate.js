'use strict';

const ValidationError = require(`../error/validation-error`);
const {VALID} = require(`../data/keksobooking`);

const validate = (data) => {
  const errors = [];
  for (let item of VALID.FIELDS) {
    if (!data[item]) {
      errors.push(`Нужно поле "${item}"!`);
    }
  }
  if (data.title.length > VALID.MAX_TITLE) {
    errors.push(`"title" длинее чем ${VALID.MAX_TITLE}`);
  } else if (data.title.length < VALID.MIN_TITLE) {
    errors.push(`"title" короче чем ${VALID.MIN_TITLE}`);
  }
  if (VALID.TYPE.find(data.type) === undefined) {
    errors.push(`"type" неправильное значение`);
  }
  if (data.price.length > VALID.MAX_TITLE) {
    errors.push(`"title" длинее чем ${VALID.MAX_TITLE}`);
  } else if (data.title.length < VALID.MIN_TITLE) {
    errors.push(`"title" короче чем ${VALID.MIN_TITLE}`);
  }
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
  return data;
};

module.exports = validate;
