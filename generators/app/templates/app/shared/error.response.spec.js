const expect = require('chai').expect;
const ErrorResponse = require('./error.response');

describe('Error response', () => {

  let response;

  beforeEach(() => {
    response = new ErrorResponse();
  });

  it('Should be an object',  () => {
    expect(response).to.be.a('object');
  });

  it('Should be to have a definite structure',  () => {
    let responseEstructure = {
      status: {
        code: null, error: null, api: null, userMessage: null, techMessage: null
      },
      payload: null
    };
    expect(response).to.eql(responseEstructure);
  });
})
