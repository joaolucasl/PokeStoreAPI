'use strict';

const request = require('supertest');
const chai = require('chai');
const Promise = require('bluebird');
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

  describe('GET', () => {
    before(done => {
      //  Since SQLite is optimized for transactions, this will lower exec time
      DBConn.transaction((t) =>
        DBConn.Promise.all([
          Pokemon.create({
            name: 'Bulbasaur',
            price: 250.5,
            stock: 10,
          }, { transaction: t }),
          Pokemon.create({
            name: 'Ivysaur',
            price: 270.5,
            stock: 8,
          }, { transaction: t }),
        ])
      ).then(done());
    });

    after((done) => {
      Pokemon.destroy({ where: {} }).then(done());
    });

    it('should return an array which children have an Id property', (done) => {
      api
        .get('/pokemon/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.have.all.property('id');
          return done();
        });
    });

    it('should return an array which children have a Name property', (done) => {
      api
        .get('/pokemon/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.have.all.property('name');
          return done();
        });
    });
    it('should return an array which children have an Price property', (done) => {
      api
        .get('/pokemon/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.have.all.property('price');
          return done();
        });
    });
    it('should return an array which children have an Stock property', (done) => {
      api
        .get('/pokemon/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.have.all.property('stock');
          return done();
        });
    });
    it('should return an array which children have an updatedAt property', (done) => {
      api
        .get('/pokemon/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.have.all.property('updatedAt');
          return done();
        });
    });
    it('should return an array which children have an createdAt property', (done) => {
      api
        .get('/pokemon/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.have.all.property('createdAt');
          return done();
        });
    });
    it('should return empty array when there is not content', (done) => {
      Pokemon
        .destroy({ where: {} })
        .then(() => {
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
        }); // Clean the DB to simulate no content

    });
  });
  describe('POST', () => {
    const pkmnData = {
      name: 'Charmander',
      price: 320.6,
      stock: 15,
    };

    it('should return OK ', (done) => {
      api
        .post('/pokemon/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(200);
          return done();
        });
    });
    it('should add a new Pokemon to the database ', (done) => {
      api
        .post('/pokemon/')
        .send(pkmnData)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(200);
          return done();
        });
    });
  });
});
