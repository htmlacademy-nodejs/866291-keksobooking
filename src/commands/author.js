'use strict';

require(`colors`);

const packageInfo = require(`../../package`);
const {COMMAND} = require(`../data/commands`);

module.exports = {
  name: COMMAND.AUTHOR,
  description: `печатает автора приложения`,
  execute() {
    console.log(`Автор: ${packageInfo.author.blue}`);
  }
};
