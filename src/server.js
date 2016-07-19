'use strict';

//  Package imports
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const logger = require('morgan');
const envSetup = require('./config/environment.js');
const PORT = process.env.PORT || 3000;
envSetup();
//  Router definitions imports
const pokemonRouter = require('./routes/pokemonRouter.js');
//  const rootRouter = require('./routes/rootRouter.js');

//  HTTP Logging
const logStream = fs.createWriteStream(`${__dirname}/access.log`, { flags: 'a' });

// Application setup
const server = express();


server.use(bodyParser.json()); //  Middleware to accept JSON payloads only
server.use('/pokemon', pokemonRouter);
server.use(logger('combined', { stream: logStream }));

server.listen(PORT);

module.exports = exports = server;