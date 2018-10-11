'use strict';
const PROGRAMM_NAME = `KeksoBooking`;
const args = process.argv.slice(2);

let code = 0;

switch (args[0]) {
  case `--help`:
    console.log(`Доступные команды:
    --help    — печатает этот текст;
    --version — печатает версию приложения;`);
    break;
  case `--version`:
    console.log(`v0.0.1`);
    break;
  default:
    if (args[0] === undefined) {
      console.log(`Привет пользователь!
    Эта программа будет запускать сервер «${PROGRAMM_NAME}».
    Автор: Кекс.`);
    } else {
      code = 1;
      console.error(`Неизвестная команда ${args[0]}.
    Чтобы прочитать правила использования приложения, наберите "--help"`);
    };
};

process.exit(code);
