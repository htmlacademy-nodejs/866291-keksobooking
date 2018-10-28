'use strict';

const express = require(`express`);
const multer = require(`multer`);

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const ValidationError = require(`../error/validation-error`);
const validate = require(`./validate`);
const KeksobukingData = require(`../models/KeksobookingData`);

const DEFAULT_SKIP = 0;
const DEFAUL_LIMIT = 20;

const upload = multer({storage: multer.memoryStorage()});
const jsonParser = express.json();

const getObjectOffers = (array, skip, limit) => {
  return {
    'data': array.slice(skip, skip + limit),
    'skip': skip,
    'limit': limit,
    'total': array.slice(skip, skip + limit).length
  };
};

module.exports = (app) => {

  app.get(`/api/offers`, (req, res, next) => {
    let skip = DEFAULT_SKIP;
    let limit = DEFAUL_LIMIT;
    if (req.query.skip) {
      skip = req.query.skip;
    }
    if (req.query.limit) {
      limit = req.query.limit;
    }
    return KeksobukingData.find()
      .exec()
      .then((data) => {
        return res.send(getObjectOffers(data, skip, limit));
      })
      .catch((err) => next(err));
  });

  app.get(`/api/offers/:date`, (req, res) => {
    const offerDate = req.params.date;
    if (!offerDate) {
      throw new IllegalArgumentError(`В запросе не указана дата`);
    }
    return KeksobukingData.findOne({
      date: offerDate
    })
      .exec()
      .then((keksobukingData) => {
        return res.send(keksobukingData);
      })
      .catch(() => {
        throw new NotFoundError(`Обьект с датой "${offerDate}" не найден`);
      });
  });

  app.post(`/api/offers`, jsonParser, upload.single(`avatar`), (req, res, next) => {
    const body = req.body;
    const avatar = req.file;
    if (avatar) {
      body.avatar = {name: avatar.originalname};
    }
    return res.send(validate(body, res, next));
  });

  app.use((err, req, res, _next) => {
    if (err instanceof ValidationError) {
      res.status(err.code).json(err.errors);
    }
  });
};
