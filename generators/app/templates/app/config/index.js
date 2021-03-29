const fs = require('fs');
const deepmerge = require('deepmerge');
const defaultConfig = require('./default.config'); // eslint-disable-line

const env = (process.env.NODE_ENV ? 'default' : 'local');
if (!fs.existsSync(`${__dirname}/${env}.config.js`)) {
  throw new Error(`the config file ${__dirname}/${env}.config.js was not found, set correctly the env variable NODE_ENV`);
}

const config = require(`${__dirname}/${env}.config.js`); // eslint-disable-line

module.exports = (env === 'local' ? Object.freeze(deepmerge(defaultConfig, config)) : defaultConfig);
