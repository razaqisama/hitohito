const {Hirer} = require('../models/index');
const encrypt = require('../helpers/encryptPWD');

class Controller {
    static hirerHome(req, res){
        let data = req.session.username
        res.render('homeHirer', {data});
    }
    static login(req, res){
        res.render('loginAsHirer');
    }
    static loginPost(req, res){
        let loginHirer = {
            username: req.body.username,
            password: req.body.password
        }
        Hirer.findOne({where: {username: loginHirer.username}})
            .then((data)=>{
                if(data){
                    if(encrypt.check(loginHirer.password, data.password)){
                        req.session.username = loginHirer.username;
                        req.session.role = 'Hirer';
                        res.redirect('/hirers');
                    } else {
                        res.send('Username/password salah say')
                    }
                    
                } else {
                    res.send('Data tidak ditemukan, say');
                }
                
            })
            .catch((err)=>{
                res.send(err);
            })
    }
    static logout(req, res){
        req.session.destroy((err) =>{
            if(err){
                res.send(err);
            }
            else {
                res.redirect('/');
            }
        })
    }
    static regist(req, res){
        res.render('registerAsHirer')
    }
    static registPost(req, res){
        const newHirer = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            age: Number(req.body.age),
            gender: req.body.gender
        }

        Hirer.create(newHirer)
            .then(()=>{
                res.redirect('/hirers/login');
            })
            .catch((err)=>{
                res.send(err)
            })
    }
}

module.exports = Controller;