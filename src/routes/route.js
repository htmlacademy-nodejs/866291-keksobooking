'use strict';

const express = require(`express`);
const multer = require(`multer`);
const MongoError = require(`mongodb`).MongoError;
const toStream = require(`buffer-to-stream`);

// eslint-disable-next-line new-cap
const offersRouter = express.Router();
const logger = require(`../logger`);
const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const ValidationError = require(`../error/validation-error`);
const validate = require(`./validate`);

const DEFAULT_SKIP = 0;
const DEFAUL_LIMIT = 20;
const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const upload = multer({storage: multer.memoryStorage()});
const jsonParser = express.json();

const getObjectOffers = async (cursor, skip = DEFAULT_SKIP, limit = DEFAUL_LIMIT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};


offersRouter.get(``, asyncMiddleware(async (req, res) => {
  const skip = parseInt(req.query.skip || DEFAULT_SKIP, 10);
  const limit = parseInt(req.query.limit || DEFAUL_LIMIT, 10);
  if (isNaN(skip) || isNaN(limit)) {
    throw new IllegalArgumentError(`Неверное значение параметра "skip" или "limit"`);
  }
  res.send(await getObjectOffers(await offersRouter.keksobookingStore.getAllObject(), skip, limit));
}));

offersRouter.get(`/:date`, asyncMiddleware(async (req, res) => {
  const offerDate = req.params.date;
  if (!offerDate) {
    throw new IllegalArgumentError(`В запросе не указана дата`);
  }
  const date = offerDate;
  const found = await offersRouter.keksobookingStore.getObject(date);
  if (!found) {
    throw new NotFoundError(`Обьект с датой "${offerDate}" не найден`);
  }

  res.send(found);
}));

offersRouter.get(`/:date/avatar`, asyncMiddleware(async (req, res) => {
  const offerDate = req.params.date;
  if (!offerDate) {
    throw new IllegalArgumentError(`В запросе не указана дата`);
  }
  const date = offerDate;
  const found = await offersRouter.keksobookingStore.getObject(date);
  if (!found) {
    throw new NotFoundError(`Обьект с датой "${offerDate}" не найден`);
  }

  const result = await offersRouter.imageStore.get(found._id);
  if (!result) {
    throw new NotFoundError(`Аватар не найден (${offerDate})`);
  }
  res.header(`Content-Type`, `image/jpg`);
  res.header(`Content-Length`, result.info.length);

  res.on(`error`, (e) => logger.error(e));
  res.on(`end`, () => res.end());
  const stream = result.stream;
  stream.on(`error`, (e) => logger.error(e));
  stream.on(`end`, () => res.end());
  stream.pipe(res);
}));

offersRouter.post(``, jsonParser, upload.single(`avatar`), asyncMiddleware(async (req, res) => {
  const body = req.body;
  const avatar = req.file;
  const validated = await validate(body);
  const result = await offersRouter.keksobookingStore.save(validated, avatar);
  const insertedId = result.insertedId;

  if (avatar) {
    await offersRouter.imageStore.save(insertedId, toStream(avatar.buffer));
  }
  res.send(validated);
}));

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  logger.error(err);
  if (err instanceof ValidationError) {
    res.status(err.code).json(err.errors);
    return;
  } else if (err instanceof MongoError) {
    res.status(400).json(err.message);
    return;
  }
  res.status(err.code || 500).send(err.message);
};

const BAD_REQUEST = (req, res) => {
  res.status(400).send(`Bad request`);
};


offersRouter.use(NOT_FOUND_HANDLER);

offersRouter.use(ERROR_HANDLER);

offersRouter.use(BAD_REQUEST);

module.exports = (keksobookingStore, imagesStore) => {
  offersRouter.keksobookingStore = keksobookingStore;
  offersRouter.imageStore = imagesStore;
  return offersRouter;
};
