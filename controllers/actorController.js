const {Actor} = require('../models/index');
const encrypt = require('../helpers/encryptPWD');

class Controller {
    static actorHome(req, res){
        let data = req.session.username
        res.render('homeActor', {data});
    }
    static login(req, res){
        res.render('loginAsActor');
    }
    static loginPost(req, res){
        let loginActor = {
            username: req.body.username,
            password: req.body.password
        }
        Actor.findOne({where: {username: loginActor.username}})
            .then((data)=>{
                if(data){
                    if(encrypt.check(loginActor.password, data.password)){
                        req.session.username = data.username;
                        req.session.userType = 'Actor';
                        res.redirect('/actors');
                    }
                    else {
                        res.send('Username / Password salah');
                    }
                } else {
                    res.send('Username tidak ditemukan.');
                }
                
            })
            .catch((err)=>{
                res.send(err);
            })
    }

    static regist(req, res){
        res.render('registerAsActor')
    }

    static registPost(req, res){
        const newActor = {
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName
        }
        Actor.create(newActor)
            .then(()=>{
                res.redirect('/actors/login')
            })
            .catch((err) =>{
                res.send(err);
            })
    }
    static logout(req, res){
        req.session.destroy((err) =>{
            if(err){
                res.send(err);
            } else {
                res.redirect('/')
            }
        })
    }
}

module.exports = Controller;