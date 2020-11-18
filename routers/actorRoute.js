const express = require('express');
const route = express.Router();
const Controller = require('../controllers/actorController');
const autentifikasi = require('../middlewares/actorAutentifikasi');

route.get('/login', Controller.login);
route.post('/login', Controller.loginPost);
route.get('/register', Controller.regist);
route.post('/register', Controller.registPost)


route.use(autentifikasi);
route.get('/', Controller.actorHome)

module.exports = route;