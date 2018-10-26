'use strict';

const path = require(`path`);

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const ValidationError = require(`../error/validation-error`);

const offerPath = path.resolve(`keksobooking.json`);
const offer = require(offerPath);

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

module.exports = (app) => {
  app.get(`/api/offers`, (req, res) => {
    res.send(offer);
  });
  app.get(`/api/offers/:date`, (req, res) => {
    const offerDate = req.params.date;
    if (!offerDate) {
      throw new IllegalArgumentError(`В запросе не указана дата`);
    }
    const date = parseInt(offerDate, 10);
    console.log(isNumber(date));
    if (!isNumber(date)) {
      throw new IllegalArgumentError(`В запросе указана неправельный формат даты`);
    }
    const found = offer.find((it) => it[`date`] === date);
    if (!found) {
      throw new NotFoundError(`Обьект с датой "${offerDate}" не найден`);
    }

    res.send(found);
  });
  app.use((err, req, res, _next) => {
    if (err instanceof ValidationError) {
      res.status(err.code).json(err.errors);
    }
  });
};
