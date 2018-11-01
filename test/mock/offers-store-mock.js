'use strict';

const Cursor = require(`./cursor-mock`);
const generator = require(`../../src/generator/generator-keksobooking`);
const DATE = 1540873946269;
let array = [];
for (let i = 0; i < 5; i++) {
  array.push(generator.generateEntity());
}
array[0].date = DATE;

class OffersMock {
  constructor(data) {
    this.data = data;
  }

  async getObject(date) {
    return this.data.filter((it) => {
      return it.date === parseInt(date, 10);
    })[0];
  }

  async getAllObject() {
    return new Cursor(this.data);
  }

  async save() {
    return {
      insertedId: 42
    };
  }
}
module.exports = new OffersMock(array);

