'use strict';

require(`colors`);

const packageInfo = require(`../package`);

const AUTHOR_COMMAND = `--author`;

module.exports = {
  name: AUTHOR_COMMAND,
  description: `печатает автора приложения`,
  isApplicable(command) {
    return command === AUTHOR_COMMAND;
  },
  execute() {
    console.log(`Автор: ${packageInfo.author.blue}`);
  }
};
