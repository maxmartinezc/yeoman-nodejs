const mockery = require('mockery');
const chai = require('chai');

const expect = chai.expect;

describe('Config default Unit Test', () => {
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
  });

  it('Should return config when the config file exist', async () => {
    expect(() => { require('./default.config') }).to.not.be.null;
  });
});
