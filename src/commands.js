'use strict';

require(`colors`);
const packageInfo = require(`../package`);
const {rl} = require(`./data/readline`);
const commands = [
  require(`./commands/help`),
  require(`./commands/version`),
  require(`./commands/author`),
  require(`./commands/license`),
  require(`./commands/description`),
  require(`./commands/fill`),
  require(`./server`),
  require(`./commands/default`),
];
const {COMMAND} = require(`./data/commands`);
const {REG_EXP} = require(`./data/reg-exp`);

let isApplicable = function (item, command) {
  return item.name === command || item.name === COMMAND.DEFAULT;
};

const enterAccept = (answer) => {
  if (answer.match(REG_EXP.YES)) {
    commands.find((item) => isApplicable(item, COMMAND.FILL)).execute(COMMAND.FILL);
  } else if (answer.match(REG_EXP.END) || answer.match(REG_EXP.NO)) {
    rl.close();
    process.exit(0);
  } else {
    rl.question(`Cгенерировать данные? (yes/no) : `, enterAccept);
  }
};

module.exports = {
  check(args) {
    const command = args[0];
    const commandParams = args.slice(0);
    if (!command) {
      rl.question(`Привет пользователь!\nЭта программа будет запускать сервер «${packageInfo.name.green}».\nАвтор: ${packageInfo.author.blue}.\nCгенерировать данные? (yes/no) : `, enterAccept);
    } else {
      rl.pause();
      commands.find((item) => isApplicable(item, command)).execute(...commandParams);
    }
  }
};
