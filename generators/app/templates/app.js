const express = require('express');
const displayRoutes = require('express-routemap');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./app/config');

const ErrorHandler = require('./app/exceptions/error-handler');

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(bodyParser.json());

// swagger
if (['prod', 'qa'].indexOf(process.env.NODE_ENV) == -1) {
  // eslint-disable-next-line global-require
  const swaggerUi = require('swagger-ui-express');
  // eslint-disable-next-line global-require
  const swaggerDocument = require('./swagger/def.json');

  app.use('/swagger/def.json', (req, res) => {
    res.send(swaggerDocument);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {}));
}

// health check MS
app.get('/health', (req, res) => {
  res.send({ status: 'UP' });
});

app.use(config.basePath, require('./app/controllers'));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  ErrorHandler(err, req, res);
});

app.listen(config.port, () => {
  // name of the api
  console.log(`\x1b[33m starting the microservice at ${Date()
    .toString()}`);
  console.log(`\x1b[34m listening on port ${config.port}`);
  console.log(`\x1b[32m running environment NODE_ENV=${process.env.NODE_ENV}`);
  // to display routes
  displayRoutes(app);
});
