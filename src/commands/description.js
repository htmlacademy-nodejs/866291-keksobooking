'use strict';

require(`colors`);
const logger = require(`../logger`);

const packageInfo = require(`../../package`);

const DESCRIPTION_COMMAND = `--description`;

module.exports = {
  name: DESCRIPTION_COMMAND,
  description: `печатает описание приложения`,
  execute() {
    logger.info(`Описание: ${packageInfo.description.blue}`);
  }
};
