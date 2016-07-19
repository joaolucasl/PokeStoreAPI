'use strict';

//  Package imports
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const logger = require('morgan');
const envSetup = require('./config/environment.js');
const PORT = process.env.PORT || 3000;
envSetup();

const pokemonRouter = require('./routes/pokemonRouter.js'); //  Router definitions imports
const logStream = fs.createWriteStream(`${__dirname}/access.log`, { flags: 'a' }); //  HTTP Logging

const server = express(); // Application setup
server.use(bodyParser.json()); //  Middleware to accept JSON payloads only
server.use('/pokemon', pokemonRouter);
server.use(logger('combined', { stream: logStream }));

//  Setup helper functions
const boot = () => server.listen(PORT);
const close = () => server.close;

// If this wasn't required as a module, we start the server automagically
if (require.main === module) {
  boot();
}

module.exports = exports = {
  app: server,
  boot,
  close,
};
