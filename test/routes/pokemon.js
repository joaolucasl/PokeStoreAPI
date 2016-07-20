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
    before((done) =>
      //  Since SQLite is optimized for transactions, this will lower exec time
      Promise.resolve(Pokemon.bulkCreate([
        {
          name: 'Bulbasaur',
          price: 250.5,
          stock: 10,
        },
        {
          name: 'Ivysaur',
          price: 270.5,
          stock: 8,
        }])).then(done())
    );

    after((done) =>
      Pokemon.destroy({ where: {} }).then(done())
    );

    it('should return an array which children have a Id property', (done) => {
      api
        .get('/pokemon/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body.length).to.be.above(0);
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
          expect(res.body.length).to.be.above(0);
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
          expect(res.body.length).to.be.above(0);
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
          expect(res.body.length).to.be.above(0);
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
          expect(res.body.length).to.be.above(0);
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
          expect(res.body.length).to.be.above(0);
          expect(res.body).to.have.all.property('createdAt');
          return done();
        });
    });
    it('should return an empty array when there is no content', (done) => {
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

    it('should return OK ', (done) => {
      const pkmnData = {
        name: 'Charmander',
        price: 740.6,
        stock: 15,
      };
      api
        .post('/pokemon/')
        .expect(200)
        .send(pkmnData)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(200);
          return done();
        });
    });

    it('should return data matching the sent parameters', (done) => {
      const pkmnData = {
        name: 'Charmeleon',
        price: 830.6,
        stock: 18,
      };

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
