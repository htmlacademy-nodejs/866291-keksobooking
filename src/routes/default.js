'use strict';

const express = require(`express`);
const multer = require(`multer`);
const toStream = require(`buffer-to-stream`);

const IllegalArgumentError = require(`../error/illegal-argument-error`);
const validate = require(`../store/keksobooking-validate`);

const DEFAULT_SKIP = 0;
const DEFAUL_LIMIT = 20;
const asyncMiddleware = require(`./async-middleware`);

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

module.exports = (offersRouter) => {
  offersRouter.get(``, asyncMiddleware(async (req, res) => {
    const skip = parseInt(req.query.skip || DEFAULT_SKIP, 10);
    const limit = parseInt(req.query.limit || DEFAUL_LIMIT, 10);
    if (isNaN(skip) || isNaN(limit)) {
      throw new IllegalArgumentError(`Неверное значение параметра "skip" или "limit"`);
    }
    res.send(await getObjectOffers(await offersRouter.keksobookingsStore.getAllObject(), skip, limit));
  }));

  offersRouter.post(``, jsonParser, upload.single(`avatar`), asyncMiddleware(async (req, res) => {
    const body = req.body;
    const avatar = req.file;
    const validated = await validate(body);
    const result = await offersRouter.keksobookingsStore.saveOffer(validated, avatar);
    const insertedId = result.insertedId;

    if (avatar) {
      await offersRouter.imageStore.save(insertedId, toStream(avatar.buffer));
    }
    res.send(validated);
  }));
};
