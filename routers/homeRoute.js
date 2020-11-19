const express = require('express');
const route = express.Router();
const autentikHome = require('../middlewares/autentikHome');
const Controller = require('../controllers/homeController');

route.get('/', autentikHome, Controller.showHome);
route.get('/loginCenter', Controller.showLoginCenter);
route.get('/registerCenter', Controller.showRegisterCenter);

module.exports = route;