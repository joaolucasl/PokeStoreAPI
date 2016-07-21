'use strict';

const express = require('express');
const purchaseController = require('../controllers/purchase.js');

const purchaseRouter = new express.Router();

purchaseRouter
  .route('/')
  .post(purchaseController.apiPost);

module.exports = exports = purchaseRouter;
