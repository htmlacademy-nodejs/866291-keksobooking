'use strict';

const {rl} = require(`../data/readline`);
const {generateEntity} = require(`../generator/generator-keksobooking`);
const KeksobookingsStore = require(`../store/keksobooking-store`);
const logger = require(`../logger`);

const GENERATE_COMMAND = `--fill`;

const writeDb = async (quantity) => {
  rl.close();
  let data = [];
  for (let i = 0; i < quantity; i++) {
    data.push(generateEntity());
  }
  await KeksobookingsStore.saveAll(data)
    .then(() => {
      logger.info(`Созданно ${quantity} объектов в базе данных`);
      process.exit(0);
    })
    .catch((e) => {
      logger.error(`Ошибка создания объектов: ${e}`);
      process.exit(1);
    });
};


const enterNumberlogger = (answer) => {
  if (answer >= 0) {
    writeDb(parseInt(answer, 10));
  } else if (answer.match(/^e(nd)?$/i)) {
    rl.close();
  } else {
    rl.question(`Введите число правильно или закройте програму командой end : `, enterNumberlogger);
  }
};

module.exports = {
  name: GENERATE_COMMAND,
  description: `генерирует данные приложения`,
  execute(command, quantity) {
    if (!(quantity >= 0)) {
      rl.question(`Сколько элементов нужно создать? (введите целое число): `, enterNumberlogger);
    } else {
      writeDb(parseInt(quantity, 10));
    }
  }
};
