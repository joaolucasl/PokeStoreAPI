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
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(204).send({
        error: err.msg,
      });
    });
};
