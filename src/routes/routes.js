'use strict';

const express = require(`express`);
const multer = require(`multer`);
const MongoError = require(`mongodb`).MongoError;

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const ValidationError = require(`../error/validation-error`);
const validate = require(`./validate`);

const DEFAULT_SKIP = 0;
const DEFAUL_LIMIT = 20;
const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const upload = multer({storage: multer.memoryStorage()});
const jsonParser = express.json();

const getObjectOffers = (data, skip = DEFAULT_SKIP, limit = DEFAUL_LIMIT) => {
  const total = parseInt(data.length || data.count(), 10);
  return {
    'data': data.slice(skip, skip + limit),
    'skip': skip,
    'limit': limit,
    'total': total
  };
};


const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  console.error(err);
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
    return;
  } else if (err instanceof MongoError) {
    res.status(400).json(err.message);
    return;
  }
  res.status(err.code || 500).send(err.message);
};
module.exports = (app, Keksobooking, KeksobookingShecma) => {

  app.get(`/api/offers`, asyncMiddleware(async (req, res) => {
    const skip = parseInt(req.query.skip || DEFAULT_SKIP, 10);
    const limit = parseInt(req.query.limit || DEFAUL_LIMIT, 10);
    if (isNaN(skip) || isNaN(limit)) {
      throw new IllegalArgumentError(`Неверное значение параметра "skip" или "limit"`);
    }
    await Keksobooking.find()
      .then((data) => {
        res.send(getObjectOffers(data, skip, limit));
      })
      .catch(() => {
        throw new NotFoundError(`Обьекты не найдены`);
      });
  }));

  app.get(`/api/offers/:date`, (req, res) => {
    const offerDate = req.params.date;
    if (!offerDate) {
      throw new IllegalArgumentError(`В запросе не указана дата`);
    }
    return Keksobooking.findOne({
      date: offerDate
    })
      .then((keksobooking) => {
        return res.send(keksobooking);
      })
      .catch(() => {
        throw new NotFoundError(`Обьект с датой "${offerDate}" не найден`);
      });
  });

  app.get(`/api/offers/:date/avatar`, asyncMiddleware(async (req, res) => {
    const offerDate = req.params.date;
    if (!offerDate) {
      throw new IllegalArgumentError(`В запросе не указана дата`);
    }
    const result = await Keksobooking.findOne({date: offerDate})
      .exec()
      .then((item) => {
        return item.getImage();
      }).catch(() => {
        throw new NotFoundError(`Обьект с датой "${offerDate}" не найден`);
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
    let keksobooking = new KeksobookingShecma();
    res.send(await keksobooking.addOffer(data, avatar, res, next));
  }));

  app.use(ERROR_HANDLER);

  app.use(NOT_FOUND_HANDLER);
};
