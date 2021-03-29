class GenericException extends Error {
  constructor(ex, message, log = { module: null, method: null, extraInfo: { } }) {
    super();
    this.name = 'GenericException';
    this.ex = ex;
    this.httpCode = ex.httpCode;
    this.message = ex.msg.replace('[%s]', message || '') || ex.msg;
    this.log = log;
  }
}

module.exports = GenericException;
