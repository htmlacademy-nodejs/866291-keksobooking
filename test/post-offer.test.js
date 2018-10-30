'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/commands/server`).app;
const TEST_OFFER = {
  "name": `Pavel`,
  "title": `Маленькая квартирка рядом с парком`,
  "address": `570, 472`,
  "description": `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
  "price": 30000,
  "type": `flat`,
  "rooms": 1,
  "guests": 1,
  "checkin": `9:00`,
  "checkout": `7:00`,
  "features": [`elevator`, `conditioner`]
};
const RETURN_OFFER = Object.assign({}, TEST_OFFER, {"location": {
  "x": 570,
  "y": 472
}});

describe(`POST /api/offers`, () => {

  it(`send offer with avatar as multipart/form-data`, async () => {

    const response = await request(app).
      post(`/api/offers`).
      field(TEST_OFFER).
      attach(`avatar`, `test/img/walrussmoke.png`).
      set(`Accept`, `application/json`).
      set(`Content-Type`, `multipart/form-data`).
      expect(200).
      expect(`Content-Type`, /json/);


    const offer = response.body;
    assert.deepEqual(offer, RETURN_OFFER);
  });

}).timeout(() => {
  console.log(1);
});

