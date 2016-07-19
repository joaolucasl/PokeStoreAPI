'use strict';

const express = require('express');
const pokemonController = require('../controllers/pokemon.js');

const pokemonRouter = new express.Router();

pokemonRouter
  .route('/')
  .get(pokemonController.apiGet);

module.exports = exports = pokemonRouter;
