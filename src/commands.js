'use strict';

require(`colors`);
const packageInfo = require(`../package`);
const commands = [
  require(`./help`),
  require(`./version`),
  require(`./author`),
  require(`./license`),
  require(`./description`),
  require(`./default`),
];
const DEFAULT_COMMAND = `default`;

module.exports = {
  commands: commands,
  check(command) {
    if (!command) {
      console.log(`Привет пользователь!\nЭта программа будет запускать сервер «${packageInfo.name.green}».\nАвтор: ${packageInfo.author.blue}.`);
      process.exit(1);
    }
    this.commands.find((item) => this.isApplicable(item, command)).execute(command);
  },
  isApplicable(item, command) {
    return item.name === command || item.name === DEFAULT_COMMAND;
  }
};
