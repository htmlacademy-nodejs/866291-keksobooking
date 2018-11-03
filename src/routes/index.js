'use strict';

const express = require(`express`);

const corsRoute = require(`./cors`);
const defaultRoute = require(`./default`);
const errorRoute = require(`./error`);
const dateRoute = require(`./date`);

const offersRouter = new express.Router();

corsRoute(offersRouter);
defaultRoute(offersRouter);
dateRoute(offersRouter);
errorRoute(offersRouter);


module.exports = (keksobookingsStore, imagesStore) => {
  offersRouter.keksobookingsStore = keksobookingsStore;
  offersRouter.imageStore = imagesStore;
  return offersRouter;
};
