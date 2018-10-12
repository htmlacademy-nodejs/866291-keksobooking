'use strict';

require(`colors`);

const HELP_COMMAND = `--help`;

module.exports = {
  isApplicable() {
    return true;
  },
  execute(command) {
    console.error(`${`Неизвестная команда`.red} ${command.italic.gray}${`. Чтобы прочитать правила использования приложения, наберите `.red}${HELP_COMMAND.italic.gray}`);
    process.exit(1);
  }
};
