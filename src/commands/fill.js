'use strict';

const rl = require(`../data/readline`);
const {generateEntity} = require(`../generator/generator-keksobooking`);
const KeksobookingsStore = require(`../store/keksobooking-store`);
const logger = require(`../logger`);
const db = require(`../database/db`);
const {COMMAND, REG_EXP} = require(`../data/constants`);

const writeDb = async (quantity) => {
  rl.close();
  const data = [];
  for (let i = 0; i < quantity; i++) {
    data.push(generateEntity());
  }
  await KeksobookingsStore.saveAll(data)
    .then(() => {
      logger.info(`Созданно ${quantity} объектов в базе данных`);
      db.stop();
    })
    .catch((e) => {
      logger.error(`Ошибка создания объектов: ${e}`);
      process.exit(1);
    });
};


const enterNumberlogger = (answer) => {
  if (answer >= 0) {
    writeDb(parseInt(answer, 10));
  } else if (answer.match(REG_EXP.END)) {
    rl.close();
  } else {
    rl.question(`Введите число правильно или закройте програму командой end : `, enterNumberlogger);
  }
};

module.exports = {
  name: COMMAND.FILL,
  description: `генерирует данные приложения`,
  execute(command, quantity) {
    if (!(quantity >= 0)) {
      rl.question(`Сколько элементов нужно создать? (введите целое число): `, enterNumberlogger);
    } else {
      writeDb(parseInt(quantity, 10));
    }
  }
};
