'use strict';

const express = require(`express`);
const multer = require(`multer`);

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const ValidationError = require(`../error/validation-error`);
const validate = require(`./validate`);
const Keksobooking = require(`../models/keksobooking.model`);

const DEFAULT_SKIP = 0;
const DEFAUL_LIMIT = 20;
const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

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
    return Keksobooking.find()
      .exec()
      .then((data) => {
        return res.json(getObjectOffers(data, skip, limit));
      })
      .catch((err) => next(err));
  });

  app.get(`/api/offers/:date`, (req, res) => {
    const offerDate = req.params.date;
    if (!offerDate) {
      throw new IllegalArgumentError(`В запросе не указана дата`);
    }
    return Keksobooking.findOne({
      date: offerDate
    })
      .exec()
      .then((keksobooking) => {
        return res.send(keksobooking);
      })
      .catch(() => {
        throw new NotFoundError(`Обьект с датой "${offerDate}" не найден`);
      });
  });

  app.get(`/api/offers/:date/avatar`, asyncMiddleware(async (req, res) => {
    const date = req.params.date;
    if (!date) {
      throw new IllegalArgumentError(`В запросе не указана дата`);
    }
    const result = await Keksobooking.findOne({"date": date})
      .then((item) => {
        return item.getImage();
      }).catch(() => {
        throw new NotFoundError(`Пользователь не найден "${date}"`);
      });

    res.header(`Content-Type`, `image/jpg`);
    res.header(`Content-Length`, result.info.length);

    res.on(`error`, (e) => console.error(e));
    res.on(`end`, () => res.end());
    const stream = result.stream;
    stream.on(`error`, (e) => console.error(e));
    stream.on(`end`, () => res.end());
    stream.pipe(res);
  }));

  app.post(`/api/offers`, jsonParser, upload.single(`avatar`), asyncMiddleware(async (req, res, next) => {
    const body = req.body;
    const avatar = req.file;
    const data = await validate(body);
    let keksobooking = new Keksobooking();
    res.send(await keksobooking.addOffer(data, avatar, res, next));
  }));

  app.use((err, req, res, _next) => {
    if (err instanceof ValidationError) {
      res.status(err.code).json(err.errors);
    }
  });
};
