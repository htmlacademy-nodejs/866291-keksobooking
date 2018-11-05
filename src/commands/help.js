'use strict';

require(`colors`);
const list = require(`./list`);
const {COMMAND} = require(`../data/constants`);

module.exports = {
  name: COMMAND.HELP,
  description: `печатает этот текст`,
  execute() {
    let message = `Доступные команды:\n${COMMAND.HELP.italic.gray} — ${`печатает этот текст`.green}`;
    for (const item of list) {
      if (item.name) {
        message += `\n${item.name.italic.gray} — ${item.description.green}`;
      }
    }
    console.log(message);
  }
};
