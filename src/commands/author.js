'use strict';

require(`colors`);
const logger = require(`../logger`);

const packageInfo = require(`../../package`);

const AUTHOR_COMMAND = `--author`;

module.exports = {
  name: AUTHOR_COMMAND,
  description: `печатает автора приложения`,
  execute() {
    logger.info(`Автор: ${packageInfo.author.blue}`);
    process.exit(0);
  }
};
