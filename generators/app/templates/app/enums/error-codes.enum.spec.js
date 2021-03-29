const expect = require('chai').expect;

describe('Enum error codes', () => {

  it('Should be an object', () => {
    const codes = require('./error-codes.enum');
    expect(codes).to.be.a('object');
  });

  it('Should have INTERNAL_SERVER_ERROR enum properties', () => {
    const { INTERNAL_SERVER_ERROR } = require('./error-codes.enum');
    expect(INTERNAL_SERVER_ERROR).to.not.be.null;
    expect(INTERNAL_SERVER_ERROR.code).to.be.eq(500);
    expect(INTERNAL_SERVER_ERROR.error).to.be.eq('INTERNAL_SERVER_ERROR');
    expect(INTERNAL_SERVER_ERROR.httpCode).to.be.eq(500);
    expect(INTERNAL_SERVER_ERROR.msg).to.be.eq('[%s]');
  });

  it('Should have SCHEMA_NOT_FOUND enum properties', () => {
    const { SCHEMA_NOT_FOUND } = require('./error-codes.enum');
    expect(SCHEMA_NOT_FOUND).to.not.be.null;
    expect(SCHEMA_NOT_FOUND.code).to.be.eq(101);
    expect(SCHEMA_NOT_FOUND.error).to.be.eq('SCHEMA_NOT_FOUND');
    expect(SCHEMA_NOT_FOUND.httpCode).to.be.eq(400);
    expect(SCHEMA_NOT_FOUND.msg).to.be.eq('Schema no encontrado.');
  });

  it('Should have SCHEMA_NOT_VALID enum properties', () => {
    const { SCHEMA_NOT_VALID } = require('./error-codes.enum');
    expect(SCHEMA_NOT_VALID).to.not.be.null;
    expect(SCHEMA_NOT_VALID.code).to.be.eq(102);
    expect(SCHEMA_NOT_VALID.error).to.be.eq('SCHEMA_NOT_VALID');
    expect(SCHEMA_NOT_VALID.httpCode).to.be.eq(400);
    expect(SCHEMA_NOT_VALID.msg).to.be.eq('Schema no válido.');
  });

})
