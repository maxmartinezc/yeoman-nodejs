/* eslint-disable no-console */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable security/detect-non-literal-require */
/* eslint-disable import/no-extraneous-dependencies */

const fileName = 'def.json';
const j2s = require('joi-to-swagger');
const fs = require('fs');
const errorCodes = require('../app/enums/error-codes.enum');

const json = require(`./${fileName}`);
const packageJson = require('../package.json');

console.log('Swagger schemas generator (it\'s not magic) start');

json.info.title = packageJson.name;
json.info.version = packageJson.version;

// schemas
Object.keys(json.components.schemas).forEach((s) => {
  let success = 'OK';
  try {
    const { schema } = require(`../app/schemas/${s}.schema`);
    Object.assign(json.components.schemas[`${s}`], j2s(schema).swagger);
  } catch (e) {
    success = `Error: ${e.message}`;
  }
  console.log(`-> ${s} (${success})`);
});

// error codes error-response
json.components.schemas['error-response'].properties.status.properties.error.enum = Object.keys(errorCodes)
  .filter((c) => { return c !== 'INTERNAL_SERVER_ERROR'; });

fs.writeFileSync(`${__dirname}/${fileName}`, JSON.stringify(json, null, 2));

console.log('**********************************************************');
console.log('Recuerda actualizar el archivo swagger con headers y ejemplos');
console.log('**********************************************************');

console.log('Swagger schemas end');
