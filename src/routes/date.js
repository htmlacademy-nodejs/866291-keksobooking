'use strict';

const logger = require(`../logger`);
const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const asyncMiddleware = require(`./async-middleware`);

module.exports = (offersRouter) => {
  offersRouter.get(`/:date`, asyncMiddleware(async (req, res) => {
    const offerDate = req.params.date;
    if (!offerDate) {
      throw new IllegalArgumentError(`В запросе не указана дата`);
    }
    const date = offerDate;
    const found = await offersRouter.keksobookingsStore.getObject(date);
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
    const found = await offersRouter.keksobookingsStore.getObject(date);
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
};
