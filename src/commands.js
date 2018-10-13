'use strict';

require(`colors`);
const packageInfo = require(`../package`);
const commands = [
  require(`./commands/help`),
  require(`./commands/version`),
  require(`./commands/author`),
  require(`./commands/license`),
  require(`./commands/description`),
  require(`./commands/default`),
];
const DEFAULT_COMMAND = `default`;

let isApplicable = function (item, command) {
  return item.name === command || item.name === DEFAULT_COMMAND;
};

module.exports = {
  check(command) {
    if (!command) {
      console.log(`Привет пользователь!\nЭта программа будет запускать сервер «${packageInfo.name.green}».\nАвтор: ${packageInfo.author.blue}.`);
      process.exit(1);
    }
    commands.find((item) => isApplicable(item, command)).execute(command);
  }
};
