class ErrorResponse {
  constructor() {
    this.status = {
      code: null, error: null, api: '<%= name %>', userMessage: null, techMessage: null
    };

    this.payload = null;
  }
}

module.exports = ErrorResponse;
