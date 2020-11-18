const express = require('express');
const route = express.Router();
const Controller = require('../controllers/hirerController');

route.get('/login', Controller.login);

module.exports = route;