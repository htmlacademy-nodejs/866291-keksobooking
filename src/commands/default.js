'use strict';

require(`colors`);

const HELP_COMMAND = `--help`;
const {COMMAND} = require(`../data/commands`);

module.exports = {
  name: COMMAND.DEFAULT,
  description: ``,
  execute(command) {
    console.log(`${`Неизвестная команда`.red} ${command.italic.gray}${`. Чтобы прочитать правила использования приложения, наберите `.red}${HELP_COMMAND.italic.gray}`);
    process.exit(1);
  }
};
