'use strict';

const request = require('supertest');
const chai = require('chai');
const Promise = require('bluebird');
const expect = chai.expect;
const assert = chai.assert;
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

  const seedPkmns = (done) =>
    Promise
      .resolve(Pokemon.bulkCreate([
        {
          name: 'Bulbasaur',
          price: 250.5,
          stock: 10,
        },
        {
          name: 'Ivysaur',
          price: 270.5,
          stock: 8,
        }]))
      .then(done());

  describe('GET', () => {
    before(seedPkmns);

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

    describe('Details [GET /:id]', () => {
      before(seedPkmns);

      it('should return 404 if no record matches the Id', (done) => {
        const pkmnId = 99999;
        api
          .get(`/pokemon/${pkmnId}`)
          .expect(404)
          .end((err, res) => {
            if (err) {
              done(err);
            }
            done();
          });
      });

      it('should return the same data as the actual record', (done) => {
        Pokemon
          .findOne({ where: {} })
          .then((record) => {
            api
              .get(`/pokemon/${record.id}`)
              .expect(200)
              .end((err, res) => {
                if (err) {
                  done(err);
                }
                //  Compare the equality of the objects
                expect({
                  name: res.body.name,
                  price: res.body.price,
                  stock: res.body.stock,
                })
                  .to
                  .eql({
                    name: record.name,
                    price: record.price,
                    stock: record.stock,
                  });
                done();
              });
          });
      });
    });
  });

  describe('POST', () => {
    it('should return 201 Created status code ', (done) => {
      const pkmnData = {
        name: 'Charmander',
        price: 740.6,
        stock: 15,
      };
      api
        .post('/pokemon/')
        .expect(201)
        .send(pkmnData)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.status).to.be.equal(201);
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
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          //  Check equality of objects
          expect({
            name: res.body.name,
            price: res.body.price,
            stock: res.body.stock,
          })
            .to.deep.equal(pkmnData);
          return done();
        });
    });

    it('should return an error message when no Name is passed', (done) => {
      const pkmnData = {
        price: 830.6,
        stock: 18,
      };

      api
        .post('/pokemon/')
        .send(pkmnData)
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.contain.keys('error');
          return done();
        });
    });
    it('should return an error message when no Price is passed', (done) => {
      const pkmnData = {
        name: 'Pikachu',
        stock: 18,
      };

      api
        .post('/pokemon/')
        .send(pkmnData)
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.contain.keys('error');
          return done();
        });
    });
    it('should set Stock to 1 when no value is passed', (done) => {
      const pkmnData = {
        name: 'Pikachu',
        price: 830.6,
      };
      api
        .post('/pokemon/')
        .send(pkmnData)
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res.body).to.contain.property('stock', 1);
          return done();
        });
    });
  });
});
