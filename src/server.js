'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();

const offersStore = require(`./routes/store`);
const imagesStore = require(`./images/store`);
const offersRouter = require(`./routes/route`)(offersStore, imagesStore);

const SERVER_COMMAND = `--server`;
const MAX_PORT = 49151;
const MIN_PORT = 1024;
const PORT = 3000;

const checkPort = (port) => {
  if (port >= MIN_PORT && port <= MAX_PORT) {
    return port;
  } else if (port !== PORT) {
    console.log(`Введен неправидьный порт ${port}`);
  }
  return PORT;
};

app.use(`/api/offers`, offersRouter);

app.use(express.static(path.resolve(`static`)));

const runServer = (port) => {

  port = parseInt(port, 10);

  app.listen(port, () => console.log(`Сервер запущен: http://localhost:${port}`));
};

module.exports = {
  name: SERVER_COMMAND,
  description: `запускает сервер`,
  execute(command, port = PORT) {
    port = checkPort(port);
    runServer(port);
  },
  app
};

if (require.main === module) {
  runServer(3000);
}
