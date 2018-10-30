'use strict';

const Keksobooking = require(`./keksobooking-mock`);
const generator = require(`../../src/generator/generator-keksobooking`);
const DATE = 1540873946269;
let array = [];
for (let i = 0; i < 5; i++) {
  array.push(generator.generateEntity());
}
array[0].date = DATE;
class KeksobookingModelMock {
  constructor(data) {
    this.data = data;
  }

  async find() {
    return new Keksobooking(this.data);
  }
  async addOffer(value) {
    const address = value.address.split(`, `);
    Object.assign(value, {location: {x: parseInt(address[0], 10), y: parseInt(address[1], 10)}});
    return value;

  }
  async findOne(date) {
    return this.data.filter((it) => {
      return it.date === parseInt(date.date, 10);
    })[0];
  }
}
const keksobookingModelMock = new KeksobookingModelMock(array);
module.exports = {
  keksobookingModelMock,
  KeksobookingModelMock
};
