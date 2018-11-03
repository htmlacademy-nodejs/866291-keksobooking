'use strict';

require(`colors`);

const packageInfo = require(`../../package`);
const {COMMAND} = require(`../data/commands`);

module.exports = {
  name: COMMAND.LICENSE,
  description: `печатает лицензию приложения`,
  execute() {
    console.log(`Лицензия: ${packageInfo.license.blue}`);
    process.exit(0);
  }
};
