'use strict';
const env = require('dotenv');

const setupEnvironment = () => {
  const environment = process.env.NODE_ENV || 'development';
  if (environment === 'development') {
    env.config();
  } else if (environment === 'test') {
    env.config({ path: '.env.test' });
  }
  env.load();
};

module.exports = exports = setupEnvironment;
