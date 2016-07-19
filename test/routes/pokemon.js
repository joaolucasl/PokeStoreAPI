'use strict';

const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const PORT = process.env.PORT || 3000;

const app = require('../../src/server.js');
const DBConn = require('../../src/config/database.js');
const Pokemon = DBConn.models.pokemon;

const api = request.agent(`http://localhost:${PORT}`);

chai.use(require('chai-things'));

describe('Pokemon Endpoint', () => {
  // Application setup functions
  before(() => {
    app.boot();
  });
  after(() => {
    app.close();
  });

  beforeEach(() => {
    Pokemon.create({
      name: 'Bulbasaur',
      price: 250.5,
      stock: 10,
    });
    Pokemon.create({
      name: 'Ivysaur',
      price: 270.5,
      stock: 8,
    });
  });

  afterEach(() => {
    Pokemon.destroy({ where: {} });
  });

  describe('GET', () => {
    it('should return empty array when there is not content', (done) => {
      Pokemon.destroy({ where: {} }); // Clean the DB to simulate no content
      api
        .get('/pokemon/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(0);
          done();
        });
    });

    it('should return an array of Pokemon data', (done) => {
      api
        .get('/pokemon/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.have.all.property('id');
          expect(res.body).to.have.all.property('name');
          expect(res.body).to.have.all.property('price');
          expect(res.body).to.have.all.property('stock');
          expect(res.body).to.have.all.property('updatedAt');
          expect(res.body).to.have.all.property('createdAt');

          return done();
        });
    });
  });
});
