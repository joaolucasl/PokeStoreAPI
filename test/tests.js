/* eslint global-require:0 */
'use strict';

global.request = require('supertest');
global.chai = require('chai');
global.Promise = require('bluebird');
global.expect = global.chai.expect;
global.PORT = global.process.env.PORT || 3000;

global.app = require('../src/server.js');
global.DBConn = require('../src/config/database.js');
global.Pokemon = global.DBConn.models.pokemon;

global.api = global.request.agent(`http://localhost:${global.PORT}`);

global.chai.use(require('chai-things'));

describe('Pokemon Store API', () => {
  before(() => {
    app.boot();
  });
  after(() => {
    app.close();
  });
  require('./routes/pokemon.js');
  require('./routes/purchase.js');
});

