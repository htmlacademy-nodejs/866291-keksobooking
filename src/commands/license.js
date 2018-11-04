'use strict';

require(`colors`);

const packageInfo = require(`../../package`);
const {COMMAND} = require(`../data/constants`);

module.exports = {
  name: COMMAND.LICENSE,
  description: `печатает лицензию приложения`,
  execute() {
    console.log(`Лицензия: ${packageInfo.license.blue}`);
  }
};
