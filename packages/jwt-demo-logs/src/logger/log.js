const winston = require('winston');
const stackTrace = require('stack-trace');
const format = require('date-fns/format');
const formatISO = require('date-fns/formatISO');
const convertTimezone = require('../utils/convert-timezone');
const config = require('../config/config');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

function transformArg(arg) {
  if (arg instanceof Error) {
    return {
      message: arg.message,
      code: arg.code,
      info: arg.info,
      stack: arg.stack,
    };
  }
  return arg;
}

function handleLogging(level, payload, trace) {
  logger.log({
    level,
    payload,
    time: `${format(convertTimezone(new Date(), config.LOG_LOCALE, config.LOG_TIMEZONE), config.LOG_LOCAL_DATE_FORMAT)} (${config.LOG_TIMEZONE})`,
    timeISO: formatISO(new Date()),
    file: trace[1].getFileName(),
    line: trace[1].getLineNumber(),
  });
}

// log levels: https://github.com/winstonjs/winston#logging
module.exports.error = (...args) => handleLogging('error', args.map((val) => transformArg(val)), stackTrace.get());
module.exports.warn = (...args) => handleLogging('warn', args.map((val) => transformArg(val)), stackTrace.get());
module.exports.info = (...args) => handleLogging('info', args.map((val) => transformArg(val)), stackTrace.get());
module.exports.verbose = (...args) => handleLogging('verbose', args.map((val) => transformArg(val)), stackTrace.get());
module.exports.debug = (...args) => handleLogging('debug', args.map((val) => transformArg(val)), stackTrace.get());
module.exports.silly = (...args) => handleLogging('silly', args.map((val) => transformArg(val)), stackTrace.get());
