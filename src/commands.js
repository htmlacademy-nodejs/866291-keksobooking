'use strict';

require(`colors`);
const packageInfo = require(`../package`);
const {rl} = require(`./data/readline`);
const path = require(`path`);
const commands = [
  require(`./commands/help`),
  require(`./commands/version`),
  require(`./commands/author`),
  require(`./commands/license`),
  require(`./commands/description`),
  require(`./commands/generate`),
  require(`./commands/server`),
  require(`./commands/default`),
];
const DEFAULT_COMMAND = `default`;
const GENERATE_COMMAND = `--generate`;
const DEFAULT_PATH = path.resolve(`keksobooking.json`);
let quantityNew = 1;
let pathFileNew = DEFAULT_PATH;

let isApplicable = function (item, command) {
  return item.name === command || item.name === DEFAULT_COMMAND;
};

const enterAccept = (answer) => {
  if (answer.match(/^y(es)?$/i)) {
    commands.find((item) => isApplicable(item, GENERATE_COMMAND)).execute(GENERATE_COMMAND, quantityNew, pathFileNew);
  } else if (answer.match(/^e(nd)?$/i) || answer.match(/^n(o)?$/i)) {
    rl.close();
  } else {
    rl.question(`Cгенерировать данные? (yes/no) : `, enterAccept);
  }
};

module.exports = {
  check(args) {
    const command = args[0];
    if (!command) {
      console.log(`Привет пользователь!\nЭта программа будет запускать сервер «${packageInfo.name.green}».\nАвтор: ${packageInfo.author.blue}.`);
      rl.question(`Cгенерировать данные? (yes/no) : `, enterAccept);
    } else {
      rl.pause();
      if (args.length > 1) {
        commands.find((item) => isApplicable(item, command)).execute(command, args[1]);
      } else {
        commands.find((item) => isApplicable(item, command)).execute(command);
      }
    }
  }
};
