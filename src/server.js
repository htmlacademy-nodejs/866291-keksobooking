'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();

const keksobookingsStore = require(`./store/keksobooking-store`);
const {avatarsStore, photesStore} = require(`./store/image-store`);
const offersRouter = require(`./routes/index`)(keksobookingsStore, avatarsStore, photesStore);
const logger = require(`./logger`);
const {COMMAND} = require(`./data/commands`);

const MAX_PORT = 49151;
const MIN_PORT = 1024;

const {
  SERVER_PORT = 3000,
  SERVER_HOST = `localhost`
} = process.env;

const checkPort = (port) => {
  port = parseInt(port, 10);
  if (port >= MIN_PORT && port <= MAX_PORT) {
    return port;
  } else if (port !== SERVER_PORT) {
    logger.info(`Введен неправидьный порт ${port}`);
  }
  return SERVER_PORT;
};

app.use(`/api/offers`, offersRouter);

app.use(express.static(path.resolve(`static`)));

const runServer = ({host, port}) => {

  port = parseInt(port, 10);

  app.listen(port, host, () => {
    logger.info(`Сервер запущен: http://${host}:${port}`);
  });
};

module.exports = {
  name: COMMAND.SERVER,
  description: `запускает сервер`,
  execute(command, port = SERVER_PORT) {
    port = checkPort(port);
    runServer({"host": SERVER_HOST, "port": port});
  },
  app
};

if (require.main === module) {
  runServer({host: SERVER_HOST, port: SERVER_PORT});
}
