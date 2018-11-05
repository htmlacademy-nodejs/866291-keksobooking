'use strict';

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

module.exports = {
  generateRandomNumber,
  takeArrayElement,
  shuffleArray
};
