const {Hirer} = require('../models/index');

class Controller {
    static login(req, res){
        res.render('loginAsHirer');
    }
}

module.exports = Controller;