'use strict';

require(`colors`);

const packageInfo = require(`../package`);

const versionParts = packageInfo.version.split(`.`);
const VERSION_COMMAND = `--version`;

module.exports = {
  name: VERSION_COMMAND,
  description: `печатает версию приложения`,
  isApplicable(command) {
    return command === VERSION_COMMAND;
  },
  execute() {
    console.log(`Версия: v${versionParts[0].red}.${versionParts[1].green}.${versionParts[2].blue}`);
  }
};
