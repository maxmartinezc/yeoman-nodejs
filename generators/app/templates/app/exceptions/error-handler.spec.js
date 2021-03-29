const mockery = require('mockery');
const expect = require('chai').expect;
const sinon = require('sinon');
const { GenericException, JoiSchemaException, NotFoundException } = require('../exceptions');

const { INTERNAL_SERVER_ERROR, SCHEMA_NOT_VALID, SCHEMA_NOT_FOUND } = require('../enums/error-codes.enum');

describe('Error Handler', () => {
  let req;
  let res;
  let fatalSpy;
  let warnSpy;

  beforeEach(() => {

    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    fatalSpy = sinon.spy();
    warnSpy = sinon.spy();

    req = {
      params: {},
      body: {
        context: 'some context code'
      }
    }

    res = {
      data: null,
      httpStatus: null,
      status(status) {
        this.httpStatus = status;
        return this;
      },
      send(payload) {
        this.data = payload;
      }
    }
  });

  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
  });

  it('Should response 400 when throw JoiSchemaException - SCHEMA_NOT_VALID ', () => {

    const ErrorHandler = require('./error-handler');
    const errors = {
      "details": [
        {
          "message": "field.name is required"
        }
      ]
    }

    ErrorHandler(new JoiSchemaException(SCHEMA_NOT_VALID, errors), req, res);

    expect(res.data.status.error).to.be.equal('SCHEMA_NOT_VALID')
    expect(res.httpStatus).to.be.equal(400);
  });

  it('Should response 400 when throw JoiSchemaException - SCHEMA_NOT_FOUND', () => {

    const ErrorHandler = require('./error-handler');

    ErrorHandler(new JoiSchemaException(SCHEMA_NOT_FOUND), req, res);

    expect(res.data.status.error).to.be.equal('SCHEMA_NOT_FOUND')
    expect(res.httpStatus).to.be.equal(400);
  });

  it('Should response 404 when throw NotFoundException', () => {
    const ErrorHandler = require('./error-handler');

    ErrorHandler(new NotFoundException(), req, res);

    expect(res.httpStatus).to.be.equal(404);
    expect(warnSpy.called).to.be.true;
    expect(warnSpy.args[0][0].errorCode).to.be.eq('NOT_FOUND');
    expect(warnSpy.args[0][0].module).to.contain('ErrorHandler');
    expect(warnSpy.args[0][0].method).to.contain('ErrorHandler');
  });

  it('Should response 500 when throw Internal Server Error from GenericException', () => {

    const ErrorHandler = require('./error-handler');

    ErrorHandler(new GenericException(INTERNAL_SERVER_ERROR, 'internal server error'), req, res);

    expect(res.data.status.error).to.be.equal('INTERNAL_SERVER_ERROR')
    expect(res.httpStatus).to.be.equal(500);
  });

  it('Should response 500 when throw Internal Server Error from any error', () => {
    const ErrorHandler = require('./error-handler');
    try {
      ErrorHandler(new Error('some error'), req);
    } catch (e) {
      expect(fatalSpy.called).to.be.true;
      expect(fatalSpy.args[0][0].module).to.be.eq('some file name');
      expect(fatalSpy.args[0][0].method).to.be.eq('some callee');
      expect(fatalSpy.args[0][0].errorCode).to.be.eq('INTERNAL_SERVER_ERROR');
      expect(fatalSpy.args[0][0].message).to.contain('some error');
      expect(fatalSpy.args[0][0].fileLine).to.eq(99);
    }
  });

  it('Should call logger with module and method parameters', () => {
    const ErrorHandler = require('./error-handler');
    const logAttrExpected = {
      module: 'some module',
      method: 'some method'
    }
    ErrorHandler(new GenericException(INTERNAL_SERVER_ERROR, 'some error', logAttrExpected), req, res);

    expect(warnSpy.called).to.be.true;
    expect(warnSpy.args[0][0].module).to.be.eq('some module');
    expect(warnSpy.args[0][0].method).to.be.eq('some method');
    expect(warnSpy.args[0][0].errorCode).to.be.eq('INTERNAL_SERVER_ERROR');
    expect(warnSpy.args[0][0].message).to.contain('some error');
    expect(res.data.status.error).to.be.equal('INTERNAL_SERVER_ERROR')
    expect(res.httpStatus).to.be.equal(500);
  });

  it('Should call logger with extraInfo parameters', () => {
    const ErrorHandler = require('./error-handler');
    const logAttrExpected = {
      module: 'some module',
      method: 'some method',
      extraInfo: {
        someExtraInfoAttr: 'some value'
      }
    }
    ErrorHandler(new GenericException(INTERNAL_SERVER_ERROR, 'some error', logAttrExpected), req, res);

    expect(warnSpy.called).to.be.true;
    expect(warnSpy.args[0][0].module).to.be.eq('some module');
    expect(warnSpy.args[0][0].method).to.be.eq('some method');
    expect(warnSpy.args[0][0].someExtraInfoAttr).to.be.eq('some value');
    expect(warnSpy.args[0][0].errorCode).to.be.eq('INTERNAL_SERVER_ERROR');
    expect(warnSpy.args[0][0].message).to.contain('some error');
    expect(res.data.status.error).to.be.equal('INTERNAL_SERVER_ERROR')
    expect(res.httpStatus).to.be.equal(500);
  });
});
