'use strict';

require(`colors`);

const packageInfo = require(`../../package`);

const versionParts = packageInfo.version.split(`.`);
const {COMMAND} = require(`../data/commands`);

module.exports = {
  name: COMMAND.VERSION,
  description: `печатает версию приложения`,
  execute() {
    console.log(`Версия: v${versionParts[0].red}.${versionParts[1].green}.${versionParts[2].blue}`);
    process.exit(0);
  }
};
