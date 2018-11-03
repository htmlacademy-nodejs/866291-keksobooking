'use strict';

require(`colors`);

const packageInfo = require(`../../package`);
const {COMMAND} = require(`../data/commands`);

module.exports = {
  name: COMMAND.DESCRIPTION,
  description: `печатает описание приложения`,
  execute() {
    console.log(`Описание: ${packageInfo.description.blue}`);
    process.exit(0);
  }
};
