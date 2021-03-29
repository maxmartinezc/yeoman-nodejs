const winston = require('winston');

class LoggerUtil {
  static getLogger() {
    return winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: '<%= group %>-<%= name %>' },
      transports: [
        new winston.transports.File({ filename: '../logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: '../logs/warn.log', level: 'warn' }),
        new winston.transports.File({ filename: '../logs/info.log', level: 'info' }),
        new winston.transports.File({ filename: '../logs/combined.log' }),
        new winston.transports.Console()
      ],
    });
  }
}

module.exports = LoggerUtil;
