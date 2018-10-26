
'use strict';

const express = require(`express`);
const path = require(`path`);
// eslint-disable-next-line new-cap
const offerRouter = express.Router();

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const ValidationError = require(`../error/validation-error`);

const offerPath = path.resolve(`keksobooking.json`);
const offer = require(offerPath);

offerRouter.get(``, (req, res) => {
  console.log(offer);
  res.send(offer);
});


offerRouter.get(`/:date`, (req, res) => {
  const offerDate = req.params.date;
  if (!offerDate) {
    throw new IllegalArgumentError(`В запросе не указана дата`);
  }

  const date = offerDate.toLowerCase();
  const found = offer.find((it) => it.name.toLowerCase() === date);
  if (!found) {
    throw new NotFoundError(`Обьект с датой "${offerDate}" не найден`);
  }

  res.send(found);
});

offerRouter.use((err, req, res, _next) => {
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
  }
});
module.exports = offerRouter;
