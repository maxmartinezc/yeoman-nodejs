const Logger = require('../utils/logger.util').getLogger();

class ExampleService {
  constructor(req) {
    this.logObject = {
      module: 'ExampleService',
      url: req.originalUrl
    };
    this.request = req;
  }

  hello() {
    Logger.warn(this.logObject);
    return "hola";
  }
}

module.exports = ExampleService;
