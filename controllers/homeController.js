
class Controller {
    static showHome(req, res){
        res.render('home');
    }
    static showLoginCenter(req, res){
        res.render('loginCenter');
    }
    static showRegisterCenter(req, res){
        res.render('registerCenter');
    }
}

module.exports = Controller