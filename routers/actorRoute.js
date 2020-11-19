const express = require('express');
const route = express.Router();
const Controller = require('../controllers/actorController');
const autentifikasi = require('../middlewares/autentifikasi');

route.get('/login', Controller.login);
route.post('/login', Controller.loginPost);
route.get('/register', Controller.regist);
route.post('/register', Controller.registPost)
route.get('/logout', Controller.logout);


route.use(autentifikasi);
route.get('/', Controller.actorHome)
route.get('/applyRequest/:id', Controller.applyRequest);
route.get('/markAsDone/:id', Controller.doneRequest);
module.exports = route;