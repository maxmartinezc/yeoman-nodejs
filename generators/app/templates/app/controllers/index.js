const router = require('express').Router();
const ExampleController = require('./example.controller');
const exampleMDW = require('../middlewares/example.mdw');

router.use(exampleMDW);
router.get('/example/hello', ExampleController.hello);

module.exports = router;
