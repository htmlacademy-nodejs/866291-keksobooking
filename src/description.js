'use strict';

require(`colors`);

const packageInfo = require(`../package`);

const DESCRIPTION_COMMAND = `--description`;

module.exports = {
  name: DESCRIPTION_COMMAND,
  description: `печатает описание приложения`,
  isApplicable(command) {
    return command === DESCRIPTION_COMMAND;
  },
  execute() {
    console.log(`Описание: ${packageInfo.description.blue}`);
  }
};
