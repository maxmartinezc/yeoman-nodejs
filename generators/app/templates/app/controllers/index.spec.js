const mockery = require('mockery');
const expect = require('chai').expect;

describe('Index', () => {

  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

  afterEach(() => {
    mockery.disable();
    mockery.deregisterAll();
  });

  it('Should use ExampleController', async () => {
    const r = require('./index');

    expect('/example/hello').to.match(r.stack[1].regexp);
    expect(['get']).to.deep.equal(Object.keys(r.stack[1].route.methods));
  });

  it('Should not be null', () => {
    const r = require('./index');
    expect(r.stack).not.be.null;
  });
})
