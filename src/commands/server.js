'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();

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

const BAD_REQUEST = (req, res) => {
  res.status(400).send(`Bad request`);
};

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`Page was not found`);
};

const ERROR_HANDLER = (err, req, res, _next) => {
  if (err) {
    console.error(err);
    res.status(err.code || 500).send(err.message);
  }
};

app.use(express.static(path.resolve(`static`)));

app.use(BAD_REQUEST);

app.use(NOT_FOUND_HANDLER);

app.use(ERROR_HANDLER);

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
  }
};

if (require.main === module) {
  runServer(3000);
}
