'use strict';

const commands = require(`./src/commands`);
const args = process.argv.slice(2);

commands.check(args);
