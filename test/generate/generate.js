'use strict';

const fs = require(`fs`);
const path = require(`path`);
const {promisify} = require(`util`);
const {generateEntity} = require(`../../src/generator/generator-keksobooking`);
const logger = require(`../../src/logger`);

const DEFAULT_PATH = path.resolve(`keksobooking.json`);
const writeFile = promisify(fs.writeFile);

const data = [];
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  execute(quantity = 1, pathFile = DEFAULT_PATH) {
    for (let i = 0; i < quantity; i++) {
      data.push(generateEntity());
    }
    return writeFile(pathFile, JSON.stringify(data), fileWriteOptions)
      .then(() => logger.info(`Файл создан успешно! (${pathFile})`))
      .catch((error) => logger.error(error));
  }
};
