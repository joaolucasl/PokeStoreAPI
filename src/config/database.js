'use strict';

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const opt = {
  database: process.env.DB_NAME || 'pokemon',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  logging: false,
};
const connection = new Sequelize(opt.database, opt.user, opt.password, opt);

// Searches for Model files imports them to the Connection
const modelsPath = path.join(__dirname, '/../', 'models/');

fs.readdirSync(modelsPath)
  .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const filePath = path.join(modelsPath, file);
    const model = connection.import(filePath);
    connection[model.name] = model;
  });

connection.sync();

module.exports = exports = connection;
