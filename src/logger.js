'use strict';

const {createLogger, format, transports} = require(`winston`);
const {combine} = format;

const logger = createLogger({
  level: `info`,
  format: format.json(),
  transports: [
    new transports.File({filename: `error.log`, level: `error`}),
    new transports.File({filename: `combined.log`})
  ]
});

if (process.env.NODE_ENV !== `production`) {
  logger.add(new transports.Console({
    level: `silly`,
    format: combine(format.colorize(), format.simple())
  }));
}

module.exports = logger;
