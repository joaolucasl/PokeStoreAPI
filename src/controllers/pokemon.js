'use strict';

const DBConn = require('../config/database.js');
const Pokemon = DBConn.models.pokemon;
/**
 * GET all Pokemons from the database
 *
 * @param {any} req
 * @param {any} res
 */
exports.apiGet = (req, res) => {
  Pokemon.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(204).json({
        error: err.msg,
      });
    });
};

exports.apiPost = (req, res) => {
  const params = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
  };

  const newPkmn = Pokemon.build(params);
  newPkmn.validate().then(err => {
    //  Checking for errors in the operation
    if (err && err.errors && err.errors.length > 0) {
      const msg = err.errors.map(el => (el.message ? el.message : 'Unknown validation error'));
      res.status(400).json({
        error: msg,
      });
    } else {  // Perform the operation otherwise
      newPkmn
        .save()
        .then(data => {
          res.status(200).json(data);
        })
        .catch(() => {
          res.status(503).json({
            error: 'It was not possible to complete this request at this time.',
          });
        });
    }
  });
};
