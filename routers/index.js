const express = require('express');
const router = express.Router();
const homeRoute = require('./homeRoute');
const actorRoute = require('./actorRoute');
const hirerRoute = require('./hirerRoute');


router.use('/', homeRoute);
router.use('/actors', actorRoute);
router.use('/hirers', hirerRoute);

module.exports = router;