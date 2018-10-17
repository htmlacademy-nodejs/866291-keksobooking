'use strict';

const fs = require(`fs`);
const {generateEntity} = require(`../generator/generator-keksobooking`);

const GENERATE_COMMAND = `--generate`;
const DEFAULT_PATH = `${process.cwd()}/keksobooking.json`;

const data = [];
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: GENERATE_COMMAND,
  description: `генерирует данные приложения`,
  execute(command, quantity = 1, path = DEFAULT_PATH) {
    for (let i = 0; i < quantity; i++) {
      data.push(generateEntity());
    }
    return new Promise((success, fail) => {
      fs.writeFile(path, JSON.stringify(data), fileWriteOptions, (err) => {
        if (err) {
          return fail(err);
        }

        return success();
      });
    });
  }
};
