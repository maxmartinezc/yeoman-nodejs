const mockery = require('mockery');
const chai = require('chai');

const expect = chai.expect;

describe('Config Index Unit Test', () => {
  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });
  });

  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
    delete process.env.NODE_ENV;
  });

  it('Should throw an exception when the config does not exist', async () => {
    const fsMock = {
      existsSync: (file) => {
        return false;
      }
    };
    mockery.registerMock('fs', fsMock);
    expect(() => { require('./index') }).to.throw(Error);
  });

  it('Should return config when the config file exist', async () => {
    const fsMock = {
      existsSync: (file) => {
        return true;
      }
    };
    mockery.registerMock('fs', fsMock);
    expect(() => { require('./index') }).to.not.be.null;
  });

  it('Should return local config', function () {
    const fsMock = {
      existsSync: (file) => {
        return true;
      }
    };
    mockery.registerMock('fs', fsMock);
    const config = require('./index');

    expect(config).to.not.be.null;
  });

  it('Should return default config', function () {
    process.env.NODE_ENV = 'some env';
    const fsMock = {
      existsSync: (file) => {
        return true;
      }
    };
    mockery.registerMock('fs', fsMock);
    const config = require('./index');
    expect(config).to.not.be.null;
  });

});
