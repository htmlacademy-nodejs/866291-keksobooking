'use strict';

const fs = require(`fs`);
const path = require(`path`);
const {promisify} = require(`util`);
const {generateEntity} = require(`../generator/generator-keksobooking`);

const GENERATE_COMMAND = `--generate`;
const DEFAULT_PATH = path.resolve(`keksobooking.json`);
const writeFile = promisify(fs.writeFile);
const readline = require(`readline`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const data = [];
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
let quantityNew = 1;
let pathFileNew = DEFAULT_PATH;
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
  if (answer) {
    executeFun(quantityNew, pathFileNew);
  } else if (answer.match(/^e(nd)?$/i)) {
    rl.close();
  } else {
    rl.question(`Введите путь правильно или закройте програму командой end : `, enterPathFile);
  }
};
const executeFun = (quantity, pathFile) => {
  rl.close();
  for (let i = 0; i < quantity; i++) {
    data.push(generateEntity());
  }
  return writeFile(pathFile, JSON.stringify(data), fileWriteOptions)
    .then(() => console.log(`Файл создан успешно! (${pathFile})`))
    .catch((error) => console.log(error));

};

module.exports = {
  name: GENERATE_COMMAND,
  description: `генерирует данные приложения`,
  execute(command, quantity = 1, pathFile = DEFAULT_PATH, isTest = false) {
    if (!isTest) {
      return rl.question(`Сколько элементов нужно создать? (введите целое число): `, enterNumberConsole);
    } else {
      return executeFun(quantity, pathFile);
    }
  }
};
