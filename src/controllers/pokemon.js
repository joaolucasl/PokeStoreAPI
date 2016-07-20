'use strict';

const DBConn = require('../config/database.js');
const Pokemon = DBConn.models.pokemon;

/**
 * GET all Pokemons from the database
 * - `200 OK` with a list of Pokemon data or an empty array if no records found.
 * - `500 Internal Server Error` if a problem prevented from querying.
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.apiGet = (req, res) => {
  Pokemon.findAll()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500).json({
        error: 'It was not possible to complete this request at this time.',
      });
    });
};

/**
 * POST Pokemon data to be inserted in the database
 * - `201 Create` if the new Pokemon record was created successfully
 * - `400 Bad Request` if the POST parameters didn't pass the validation
 * - `500 Internal Server Error` if a problem prevented from performing the operation
 *
 * @param {Object} req
 * @param {Object} res
 */
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
          res.status(201).json(data); //  201 Created + new row data
        })
        .catch(() => {
          res.status(500).json({
            error: 'It was not possible to complete this request at this time.',
          });
        });
    }
  });
};

/**
 * GET Pokemon details by ID
 *
 * Returns:
 * - `200 OK` with the Pokemon data if found
 * - `404 Not Found` if there's no Pokemon for the given ID
 * - `500 Internal Server Error` if a problem prevented from querying   
 *
 * @param {Object} req
 * @param {Object} res
 */
exports.apiDetails = (req, res) => {
  Pokemon
    .findById(req.params.id)
    .then(data => {
      if (!data) {
        res.status(404).json({});
      } else {
        res.status(200).json(data); // 404 for Non-existent content
      }
    })
    .catch(() => {
      res.status(500).json({
        error: 'It was not possible to complete this request at this time.',
      });
    });
};
