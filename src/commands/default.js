'use strict';

require(`colors`);
const logger = require(`../logger`);

const HELP_COMMAND = `--help`;
const DEFAULT_COMMAND = `default`;

module.exports = {
  name: DEFAULT_COMMAND,
  description: ``,
  execute(command) {
    logger.error(`${`Неизвестная команда`.red} ${command.italic.gray}${`. Чтобы прочитать правила использования приложения, наберите `.red}${HELP_COMMAND.italic.gray}`);
    process.exit(1);
  }
};
