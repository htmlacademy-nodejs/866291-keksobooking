'use strict';

require(`colors`);
const commands = [
  require(`./version`),
  require(`./author`),
  require(`./license`),
  require(`./description`)
];
const HELP_COMMAND = `--help`;

module.exports = {
  name: HELP_COMMAND,
  description: `печатает этот текст`,
  isApplicable(command) {
    return command === HELP_COMMAND;
  },
  execute() {
    let message = `Доступные команды:\n${HELP_COMMAND.italic.gray} — печатает этот текст;`;
    commands.forEach(function (item) {
      if (item.name) {
        message += `\n${item.name.italic.gray} — ${item.description};`;
      }
    });
    console.log(message);
  }
};
