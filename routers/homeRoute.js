const express = require('express');
const route = express.Router();
const Controller = require('../controllers/homeController');

route.get('/', Controller.showHome);
route.get('/loginCenter', Controller.showLoginCenter);
route.get('/registerCenter', Controller.showRegisterCenter);

module.exports = route;