'use strict';

require(`colors`);
const packageInfo = require(`../package`);

module.exports = {
  commands: [
    require(`./help`),
    require(`./version`),
    require(`./author`),
    require(`./license`),
    require(`./description`),
    require(`./default`),
  ],
  check(command) {
    if (!command) {
      console.log(`Привет пользователь!\nЭта программа будет запускать сервер «${packageInfo.name.green}».\nАвтор: ${packageInfo.author.blue}.`);
      process.exit(1);
    }
    this.commands.find((item) => item.isApplicable(command)).execute(command);
  }
};
