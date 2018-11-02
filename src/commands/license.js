'use strict';

require(`colors`);
const logger = require(`../logger`);

const packageInfo = require(`../../package`);

const LICENSE_COMMAND = `--license`;

module.exports = {
  name: LICENSE_COMMAND,
  description: `печатает лицензию приложения`,
  execute() {
    logger.info(`Лицензия: ${packageInfo.license.blue}`);
    process.exit(0);
  }
};
