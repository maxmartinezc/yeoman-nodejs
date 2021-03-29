const ErrorCodes = {
  INTERNAL_SERVER_ERROR: {
    httpCode: 500, code: 500, error: 'INTERNAL_SERVER_ERROR', msg: '[%s]', userMsg: null
  },
  SCHEMA_NOT_FOUND: {
    httpCode: 400, code: 101, error: 'SCHEMA_NOT_FOUND', msg: 'Schema no encontrado.', userMsg: null
  },
  SCHEMA_NOT_VALID: {
    httpCode: 400, code: 102, error: 'SCHEMA_NOT_VALID', msg: 'Schema no válido.', userMsg: null
  }
};

module.exports = Object.freeze(ErrorCodes);
