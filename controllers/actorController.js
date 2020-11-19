const {Actor, Hirer, Request} = require('../models/index');

const encrypt = require('../helpers/encryptPWD');

class Controller {
    static actorHome(req, res){
        let displayName = req.session.displayName
        let ActorId = req.session.actorId
        let reqAvailable;
        let reqOnProgress;
        Request.findAll({where: {requestStatus: 'Available'}, include: [Hirer]})
            .then((data)=>{
                reqAvailable = data;
                return Request.findAll({where: {requestStatus: 'On Progress', ActorId: ActorId}, include: [Hirer]})
            })
            .then((data) =>{
                reqOnProgress = data;
                res.render('homeActor', {displayName, reqAvailable, reqOnProgress});
            })
            .catch((err) =>{
                res.send(err);
            })
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
                        req.session.displayName = data.displayName;
                        req.session.actorId = data.id;
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
                res.send(err.message);
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
                res.send(err.message);
            })
    }

    static logout(req, res){
        req.session.destroy((err) =>{
            if(err){
                res.send(err.message);
            } else {
                res.redirect('/')
            }
        })
    }

    static applyRequest(req, res){
        const reqApplyId = req.params.id;
        const toUpdate = {
            requestStatus: 'On Progress',
            ActorId: req.session.actorId
        }
        console.log(req.session.actorId);
        Request.update(toUpdate, {where: {id: reqApplyId}})
            .then(()=>{
                res.redirect('/actors')
            })
    }
    static doneRequest(req, res){
        const reqDoneId = req.params.id;
        const toUpdate = {
            requestStatus: 'Done'
        }
        Request.update(toUpdate, {where: {id: reqDoneId}})
            .then(()=>{
                res.redirect('/actors');
            })
            .catch((err) =>{
                res.send(err);
            })
    }
}

module.exports = Controller;