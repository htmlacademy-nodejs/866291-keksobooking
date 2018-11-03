'use strict';

require(`colors`);
const logger = require(`../logger`);
const commands = [
  require(`./version`),
  require(`./author`),
  require(`./license`),
  require(`./description`),
  require(`./fill`),
  require(`../server`)
];
const HELP_COMMAND = `--help`;

module.exports = {
  name: HELP_COMMAND,
  description: `печатает этот текст`,
  execute() {
    let message = `Доступные команды:\n${HELP_COMMAND.italic.gray} — ${`печатает этот текст`.green}`;
    commands.forEach(function (item) {
      if (item.name) {
        message += `\n${item.name.italic.gray} — ${item.description.green}`;
      }
    });
    logger.info(message);
    process.exit(0);
  }
};
