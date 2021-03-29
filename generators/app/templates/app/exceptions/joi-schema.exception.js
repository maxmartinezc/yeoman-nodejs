const GenericException = require('./generic.exception');

class JoiSchemaException extends GenericException {
  constructor(ex, joiErrors, log = {}) {
    super(ex, null, log);
    this.name = 'JoiSchemaException';
    this.httpCode = 400;
    this.payload = joiErrors ? this.formatPayloadMessage(joiErrors) : joiErrors;
  }

  formatPayloadMessage(joiErrors) {
    return joiErrors.details.map((i) => i.message.replace(/"/g, ''));
  }
}

module.exports = JoiSchemaException;
