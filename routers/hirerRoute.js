const express = require('express');
const route = express.Router();
const Controller = require('../controllers/hirerController');
const autentifikasi = require('../middlewares/autentifikasi');

route.get('/login', Controller.login);
route.post('/login', Controller.loginPost);
route.get('/logout', Controller.logout);
route.get('/register', Controller.regist);
route.post('/register', Controller.registPost);

route.use(autentifikasi);
route.get('/', Controller.hirerHome);
route.post('/addRequest', Controller.addRequestPost);
route.get('/cancelRequest/:id', Controller.cancelRequest);
route.post('/giveRating/:id', Controller.giveRating);
module.exports = route;