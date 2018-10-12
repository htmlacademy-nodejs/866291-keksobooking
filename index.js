'use strict';

const commands = require(`./src/commands`);
const args = process.argv.slice(2);
const command = args[0];

commands.check(command);
