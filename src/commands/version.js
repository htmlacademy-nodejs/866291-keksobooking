'use strict';

require(`colors`);
const logger = require(`../logger`);

const packageInfo = require(`../../package`);

const versionParts = packageInfo.version.split(`.`);
const VERSION_COMMAND = `--version`;

module.exports = {
  name: VERSION_COMMAND,
  description: `печатает версию приложения`,
  execute() {
    logger.info(`Версия: v${versionParts[0].red}.${versionParts[1].green}.${versionParts[2].blue}`);
    process.exit(0);
  }
};
