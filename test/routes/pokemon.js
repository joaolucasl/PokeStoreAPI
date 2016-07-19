'use strict';

const request = require('supertest');
const should = require('should');
const PORT = process.env.PORT || 3000

const api = request.agent(`http://localhost:${PORT}`);

describe('Pokemon Endpoint', () => {
  describe('GET', () => {
    it('should return the test page', (done) => {
      api.get('/pokemon/').expect(200, done);
    });
  });
});
