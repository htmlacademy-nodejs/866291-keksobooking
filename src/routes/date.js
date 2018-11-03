'use strict';

const logger = require(`../logger`);
const IllegalArgumentError = require(`../error/illegal-argument-error`);
const NotFoundError = require(`../error/not-found-error`);
const asyncMiddleware = require(`./async-middleware`);

const findObject = async (offersRouter, date) => {
  if (!date) {
    throw new IllegalArgumentError(`В запросе не указана дата`);
  }
  const found = await offersRouter.keksobookingsStore.getObject(date);
  if (!found) {
    throw new NotFoundError(`Обьект с датой "${date}" не найден`);
  }
  return found;
};

const returnPhoto = (res, result) => {
  res.header(`Content-Type`, `image/jpg`);
  res.header(`Content-Length`, result.info.length);
  res.on(`error`, (e) => logger.error(e));
  res.on(`end`, () => res.end());
  const stream = result.stream;
  stream.on(`error`, (e) => logger.error(e));
  stream.on(`end`, () => res.end());
  stream.pipe(res);
};

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
    const found = await findObject(offersRouter, req.params.date);
    const result = await offersRouter.avatarsStore.get(found._id);
    if (!result) {
      throw new NotFoundError(`Аватар не найден (${req.params.date})`);
    }
    returnPhoto(res, result);
  }));

  offersRouter.get(`/:date/photos/:number`, asyncMiddleware(async (req, res) => {
    const found = await findObject(offersRouter, req.params.date);
    const numberPhotes = parseInt(req.params.number, 10);
    const result = await offersRouter.photesStore.get({id: found._id, number: numberPhotes});
    if (!result) {
      throw new NotFoundError(`Картинка не найден (${req.params.date})`);
    }
    returnPhoto(res, result);
  }));

};
