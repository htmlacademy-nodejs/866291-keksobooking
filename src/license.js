'use strict';

require(`colors`);

const packageInfo = require(`../package`);

const LICENSE_COMMAND = `--license`;

module.exports = {
  name: LICENSE_COMMAND,
  description: `печатает лицензию приложения`,
  isApplicable(command) {
    return command === LICENSE_COMMAND;
  },
  execute() {
    console.log(`Лицензия: ${packageInfo.license.blue}`);
  }
};
