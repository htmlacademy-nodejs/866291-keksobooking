'use strict';

require(`colors`);
const fs = require(`fs`);
const packageInfo = require(`../package`);
const readline = require(`readline`);
const path = require(`path`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const commands = [
  require(`./commands/help`),
  require(`./commands/version`),
  require(`./commands/author`),
  require(`./commands/license`),
  require(`./commands/description`),
  require(`./commands/generate`),
  require(`./commands/default`),
];
const DEFAULT_COMMAND = `default`;
const GENERATE_COMMAND = `--generate`;
const DEFAULT_PATH = path.resolve(`keksobooking.json`);

let isApplicable = function (item, command) {
  return item.name === command || item.name === DEFAULT_COMMAND;
};

let quantityNew = 1;
let pathFileNew = DEFAULT_PATH;
const fileExists = (filePath) => {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
};
const enterAccept = (answer) => {
  if (answer.match(/^y(es)?$/i)) {
    rl.question(`Сколько элементов нужно создать? (введите целое число): `, enterNumberConsole);
  } else if (answer.match(/^e(nd)?$/i) || answer.match(/^n(o)?$/i)) {
    rl.close();
  } else {
    rl.question(`Cгенерировать данные? (yes/no) : `, enterAccept);
  }
};
const enterNumberConsole = (answer) => {
  if (answer >= 0) {
    quantityNew = answer;
    rl.question(`Введите путь к файлу : `, enterPathFile);
  } else if (answer.match(/^e(nd)?$/i)) {
    rl.close();
  } else {
    rl.question(`Введите число правильно или закройте програму командой end : `, enterNumberConsole);
  }
};
const enterPathFile = (answer) => {
  if (fileExists(answer)) {
    pathFileNew = answer;
    rl.question(`Перезаписать файл? (yes/no) : `, enterAcceptFile);
  } else if (answer) {
    pathFileNew = answer;
    commands.find((item) => isApplicable(item, GENERATE_COMMAND)).execute(GENERATE_COMMAND, quantityNew, pathFileNew);
    rl.close();
  } else if (answer.match(/^e(nd)?$/i)) {
    rl.close();
  } else {
    rl.question(`Введите путь правильно или закройте програму командой end : `, enterPathFile);
  }
};
const enterAcceptFile = (answer) => {
  if (answer.match(/^y(es)?$/i)) {
    commands.find((item) => isApplicable(item, GENERATE_COMMAND)).execute(GENERATE_COMMAND, quantityNew, pathFileNew);
    rl.close();
  } else if (answer.match(/^e(nd)?$/i) || answer.match(/^n(o)?$/i)) {
    rl.close();
  } else {
    rl.question(`Введите число правильно или закройте програму командой end : `, enterNumberConsole);
  }
};
module.exports = {
  check(command) {
    if (!command) {
      console.log(`Привет пользователь!\nЭта программа будет запускать сервер «${packageInfo.name.green}».\nАвтор: ${packageInfo.author.blue}.`);
      rl.question(`Cгенерировать данные? (yes/no) : `, enterAccept);
    } else {
      commands.find((item) => isApplicable(item, command)).execute(command);
    }
  }
};
