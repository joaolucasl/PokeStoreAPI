'use strict';

const express = require('express');
const pokemonController = require('../controllers/pokemon.js');

const pokemonRouter = new express.Router();

pokemonRouter
  .route('/')
  .get(pokemonController.apiGet)
  .post(pokemonController.apiPost);

pokemonRouter
  .route('/:id(\\d+)/') //  Regex to accept only integers
  .get(pokemonController.apiDetails);

module.exports = exports = pokemonRouter;
