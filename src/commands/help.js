'use strict';

require(`colors`);
const commands = [
  require(`./version`),
  require(`./author`),
  require(`./license`),
  require(`./description`),
  require(`./fill`),
  require(`../server`)
];
const {COMMAND} = require(`../data/constants`);

module.exports = {
  name: COMMAND.HELP,
  description: `печатает этот текст`,
  execute() {
    let message = `Доступные команды:\n${COMMAND.HELP.italic.gray} — ${`печатает этот текст`.green}`;
    commands.forEach(function (item) {
      if (item.name) {
        message += `\n${item.name.italic.gray} — ${item.description.green}`;
      }
    });
    console.log(message);
  }
};
