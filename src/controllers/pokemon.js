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
  res.status(200).json({ msg: 'Hello' });
};
