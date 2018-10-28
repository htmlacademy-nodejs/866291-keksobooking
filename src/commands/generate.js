'use strict';

const fs = require(`fs`);
const path = require(`path`);
const {promisify} = require(`util`);
const {rl} = require(`../data/readline`);
const {generateEntity} = require(`../generator/generator-keksobooking`);
const KeksobukingData = require(`../models/KeksobookingData`);

const GENERATE_COMMAND = `--generate`;
const DEFAULT_PATH = path.resolve(`keksobooking.json`);
const writeFile = promisify(fs.writeFile);

const data = [];
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

let quantityNew = 1;
let pathFileNew = DEFAULT_PATH;

const fileExists = (filePath) => {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
};

const writeFileReturn = (message = `Файл создан успешно! (${pathFileNew})`) => {
  rl.close();
  for (let i = 0; i < quantityNew; i++) {
    data.push(generateEntity());
  }
  for (let item of data) {
    let keksobukingData = new KeksobukingData();
    Object.assign(keksobukingData, item);
    keksobukingData.save();
  }
  return writeFile(pathFileNew, JSON.stringify(data), fileWriteOptions)
    .then(() => console.log(message))
    .catch((error) => console.log(error));
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
  } else if (answer.match(/^e(nd)?$/i)) {
    rl.close();
  } else if (answer) {
    pathFileNew = answer;
    writeFileReturn();
    rl.close();
  } else {
    rl.question(`Введите путь правильно или закройте програму командой end : `, enterPathFile);
  }
};
const enterAcceptFile = (answer) => {
  if (answer.match(/^y(es)?$/i)) {
    writeFileReturn(`Файл перезаписан успешно! (${pathFileNew})`);
    rl.close();
  } else if (answer.match(/^e(nd)?$/i) || answer.match(/^n(o)?$/i)) {
    rl.close();
  } else {
    rl.question(`Введите число правильно или закройте програму командой end : `, enterNumberConsole);
  }
};

module.exports = {
  name: GENERATE_COMMAND,
  description: `генерирует данные приложения`,
  execute(command, quantity = 1, pathFile = DEFAULT_PATH, isTest = false) {
    quantityNew = quantity;
    pathFileNew = pathFile;
    if (!isTest) {
      return rl.question(`Сколько элементов нужно создать? (введите целое число): `, enterNumberConsole);
    } else {
      return writeFileReturn();
    }
  }
};
