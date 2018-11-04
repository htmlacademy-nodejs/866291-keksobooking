'use strict';

require(`colors`);
const packageInfo = require(`../package`);
const {rl} = require(`./data/readline`);
const commands = [...require(`./commands/list`)];
commands.push(require(`./commands/help`));
commands.push(require(`./commands/default`));

const {COMMAND, REG_EXP} = require(`./data/constants`);

let isApplicable = function (item, command) {
  return item.name === command || item.name === COMMAND.DEFAULT;
};

const enterAccept = (answer) => {
  if (answer.match(REG_EXP.YES)) {
    commands.find((item) => isApplicable(item, COMMAND.FILL)).execute(COMMAND.FILL);
  } else if (answer.match(REG_EXP.END) || answer.match(REG_EXP.NO)) {
    rl.close();
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
