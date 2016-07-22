'use strict';

describe('Purchase Endpoint', () => {
  const seedPkmns = (done) =>
    Promise
      .resolve(Pokemon.bulkCreate([
        {
          name: 'Bulbasaur',
          price: 250.5,
          stock: 90,
        },
        {
          name: 'Ivysaur',
          price: 270.5,
          stock: 90,
        }]))
      .then(done());

  describe('GET', () => {
    before(seedPkmns);

    after((done) =>
      Pokemon.destroy({ where: {} }).then(done())
    );

    const postData = {
      card_number: '4024007138010896',
      card_expiration_date: '1050',
      card_holder_name: 'Ash Ketchum',
      card_cvv: '123',
    };

    describe('POST', () => {
      it('should return status 404 if no request was sent', (done) => {
        api
          .post('/purchase/')
          .expect(404)
          .end((err) => {
            if (err) {
              return done(err);
            }
            return done();
          });
      });

      it('should return status an empty body if no request was sent', (done) => {
        api
          .post('/purchase/')
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body).to.eql({});
            return done();
          });
      });

      it('should return OK if the purchase was completed successfully', (done) => {
        //  Get a Pokemon ID from the DB to be purchased
        Pokemon
          .findOne({ where: {} })
          .then((record) => {
            postData.id = record.id;
            postData.quantity = 1;
            api
              .post('/purchase/')
              .send(postData)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(res.status).to.eql(200);
                return done();
              });
          });
      });
      it('should return a body with property \'status\' as \'paid\'', (done) => {
        //  Get a Pokemon ID from the DB to be purchased
        Pokemon
          .findOne({ where: {} })
          .then((record) => {
            postData.id = record.id;
            postData.quantity = 1;
            api
              .post('/purchase/')
              .send(postData)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(res.body.status).to.equal('paid');
                return done();
              });
          });
      });
      it('should return an error when an invalid CVV is supplied', (done) => {
        //  Get a Pokemon ID from the DB to be purchased
        Pokemon
          .findOne({ where: {} })
          .then((record) => {
            postData.id = record.id;
            postData.quantity = 1;
            postData.card_cvv = 654;
            api
              .post('/purchase/')
              .send(postData)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(res.body).to.have.property('error');
                return done();
              });
          });
      });
      it('should return an error when an invalid expiration date is supplied', (done) => {
        //  Get a Pokemon ID from the DB to be purchased
        Pokemon
          .findOne({ where: {} })
          .then((record) => {
            postData.id = record.id;
            postData.quantity = 1;
            postData.card_expiration_date = null;
            api
              .post('/purchase/')
              .send(postData)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(res.body).to.have.property('error');
                return done();
              });
          });
      });
      it('should return an error when an invalid card number is supplied', (done) => {
        //  Get a Pokemon ID from the DB to be purchased
        Pokemon
          .findOne({ where: {} })
          .then((record) => {
            postData.id = record.id;
            postData.quantity = 1;
            postData.card_number = null;
            api
              .post('/purchase/')
              .send(postData)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(res.body).to.have.property('error');
                return done();
              });
          });
      });
      it('should return an error when quantity is more than in stock', (done) => {
        //  Get a Pokemon ID from the DB to be purchased
        Pokemon
          .findOne({ where: {} })
          .then((record) => {
            postData.id = record.id;
            postData.quantity = 99999999999;
            api
              .post('/purchase/')
              .send(postData)
              .end((err, res) => {
                if (err) {
                  return done(err);
                }
                expect(res.body).to.have.property('error');
                return done();
              });
          });
      });
      it('should return {} when a non-existent ID is passed', (done) => {
        postData.id = 999999;
        postData.quantity = 1;
        api
          .post('/purchase/')
          .send(postData)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            expect(res.body).to.eql({});
            return done();
          });
      });
    });
  });
});
