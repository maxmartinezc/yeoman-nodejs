const ExampleService = require('../services/example.service');

class ExampleController {
  static hello(req, res, next) {
    try {
      const exampleService = new ExampleService(req);
      const resp = exampleService.hello();
      res.status(200).send(resp);
    } catch (ex) {
      next(ex);
    }
  }

  static schema(req, res, next) {
    try {
      const exampleService = new ExampleService(req);
      const resp = exampleService.schema();
      res.status(200).send(resp);
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = ExampleController;
