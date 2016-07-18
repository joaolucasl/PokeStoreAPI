'use strict';

//  Package imports
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const logger = require('morgan');

//  Router definitions imports
const pokemonRouter = require('./routes/pokemonRouter.js');
//  const rootRouter = require('./routes/rootRouter.js');

const logStream = fs.createWriteStream(`${__dirname}/access.log`, { flags: 'a' }); //  HTTP Logging

const server = express();

// Application setup
server.use(bodyParser.json()); //  Middleware to accept JSON payloads only
server.use('/pokemon', pokemonRouter);
server.use(logger('combined', { stream: logStream }));
server.listen(3000);
