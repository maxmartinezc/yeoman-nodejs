const mockery = require('mockery');
const expect = require('chai').expect;

describe('Enum error codes', () => {

  let logger;

  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
    logger = {
      getLogger: () => ({
        info: () => { },
        error: () => { },
        debug: () => { },
        trace: () => { },
        warn: () => { },
        fatal: () => {}
      })
    };
  });

  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
  });

  it('Should be an object', function () {
    const index = require('./index');
    expect(index).to.be.a('object');
  });

  it('Should has GenericException', function () {
    const index = require('./index');
    expect(index.GenericException.name).to.eq('GenericException');
  });

  it('Should has JoiSchemaException', function () {
    const index = require('./index');
    expect(index.JoiSchemaException.name).to.eq('JoiSchemaException');
  });

  it('Should has NotFoundException', function () {
    const index = require('./index');
    expect(index.NotFoundException.name).to.eq('NotFoundException');
  });
})
