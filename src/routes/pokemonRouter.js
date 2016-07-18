'use strict';

const express = require('express');

const PokemonRouter = new express.Router();

PokemonRouter.get('/', (req, res) => {
  res.send('GET POKEMON');
});

module.exports = exports = PokemonRouter;
