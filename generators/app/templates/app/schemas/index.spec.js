
const expect = require('chai').expect;

describe('Index schemas', () => {

  it('Should be object', () => {
    const schemas = require('./index');
    expect(schemas).to.be.a('object');
    expect(schemas).to.be.not.null;
    expect(schemas.login).to.be.not.null;
  });

  it('all properties of schema index Should be a object', () => {
    const schemas = require('./index');
    for (schema in schemas) {
      expect(schemas[schema]).to.be.a('object');
      for(code in schemas[schema]){
        expect(schemas[schema][code]).to.be.a('object');
        for(s in schemas[schema][code]){
          expect(schemas[schema][code][s]).to.be.a('object');
        }
      }
    }
  });
})
