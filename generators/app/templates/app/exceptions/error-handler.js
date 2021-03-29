const { get } = require('lodash');
const Logger = require('../utils/logger.util').getLogger();
const ErrorResponse = require('../shared/error.response');
const { GenericException, NotFoundException, JoiSchemaException } = require('.');
const { INTERNAL_SERVER_ERROR } = require('../enums/error-codes.enum');

const ErrorHandler = (err, req, res) => {
  let exception = err;
  const response = new ErrorResponse();

  const logWarnData = {
    ...{
      module: get(exception, 'log.module', null) || 'ErrorHandler',
      method: get(exception, 'log.method', null) || 'ErrorHandler',
      description: get(exception, 'ex.payload', null),
      message: exception.message,
      errorCode: get(exception, 'ex.error', null),
      url: get(req, 'originalUrl', null)
    },
    ...get(exception, 'log.extraInfo', {})
  };

  switch (err.name) {
    case GenericException.name:
    case NotFoundException.name:
      Logger.warn(logWarnData);
      break;
    case JoiSchemaException.name:
      Logger.warn({
        ...logWarnData,
        joiDetails: (exception.payload ? exception.payload.join(',') : exception.message)
      });
      break;
    default:
      exception = new GenericException(INTERNAL_SERVER_ERROR, exception.message);
      Logger.fatal({
        message: exception.message,
        errorCode: exception.ex.error,
        url: get(req, 'originalUrl', null)
      });
      break;
  }

  let body = null;
  if (err.httpCode !== 404) {
    response.status.code = exception.ex.code;
    response.status.error = exception.ex.error;
    response.status.techMessage = exception.message;
    response.status.userMessage = exception.ex.userMsg;
    response.payload = exception.payload || null;
    body = response;
  }

  res.status(exception.httpCode).send(body);
};

module.exports = ErrorHandler;
