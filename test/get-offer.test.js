'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/commands/server`).app;
const DATE = 1540277831463;
const DATE_FAIL = 1;

describe(`GET /api/offer`, () => {
  it(`get all offer`, async () => {

    const response = await request(app).
      get(`/api/offer`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.equal(offer.length, 17);
  });

  it(`get all offer with / at the end`, async () => {

    const response = await request(app).
      get(`/api/offer/`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const offer = response.body;
    assert.equal(offer.length, 17);
  });

  it(`get data from unknown resource`, async () => {
    return await request(app).
      get(`/api/none`).
      set(`Accept`, `application/json`).
      expect(404).
      expect(`Page was not found`).
      expect(`Content-Type`, /html/);
  });

});

describe(`GET /api/offer/:date`, () => {
  it(`get date ${DATE}`, async () => {
    const response = await request(app).
      get(`/api/offer/${encodeURI(`${DATE}`)}`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const date = response.body;
    assert.strictEqual(date.date, DATE);
  });

  xit(`get unknown date format`, async () => {
    return request(app).
      get(`/api/offer/${encodeURI(`test123`)}`).
      set(`Accept`, `application/json`).
      expect(404).
      expect(`неверный формат запроса`).
      expect(`Content-Type`, /html/);
  });

  xit(`get unknown date with ${DATE_FAIL}`, async () => {
    return request(app).
      get(`/api/offer/${encodeURI(`${DATE_FAIL}`)}`).
      set(`Accept`, `application/json`).
      expect(404).
      expect(`обьект с <<${DATE_FAIL}>> не найден`).
      expect(`Content-Type`, /html/);
  });
});
