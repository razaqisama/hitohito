const {Actor, Hirer, Request} = require('../models/index');
const encrypt = require('../helpers/encryptPWD');
const newRating = require('../helpers/countRating');

class Controller {
    static hirerHome(req, res){
        let name = req.session.name;
        let HirerId = req.session.hirerId;
        let reqOnProgress;
        let myPendingReq;
        let myDoneReq;
        Request.findAll({where: {HirerId, requestStatus: 'On Progress'}, include: [Actor]})
            .then((data)=>{
                reqOnProgress = data;
                return Request.findAll({where: {HirerId, requestStatus: 'Available'}})
            })
            .then((data)=>{
                myPendingReq = data;
                return Request.findAll({where: {HirerId, requestStatus: 'Done'}, include: [Actor]})
            })
            .then((data)=>{
                myDoneReq = data;
                res.render('homeHirer', {name, reqOnProgress, myPendingReq, myDoneReq})
            })
            .catch((err)=>{
                res.send(err);
            })
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
                        req.session.username = data.username;
                        req.session.name = data.name;
                        req.session.hirerId = data.id;
                        res.redirect('/hirers');
                    } else {
                        res.send('Username/password salah say')
                    }
                    
                } else {
                    res.send('username tidak ditemukan, say');
                }
                
            })
            .catch((err)=>{
                res.send(err.message);
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
                res.send(err.message)
            })
    }

    static addRequestPost(req, res){
        let newRequest = {
            HirerId: req.session.hirerId,
            request: req.body.request
        }
        Request.create(newRequest)
            .then(()=>{
                res.redirect('/hirers')
            })
            .catch((err)=>{
                res.send(err);
            })
    }
    static cancelRequest(req, res){
        const requestCancelId = req.params.id;
        Request.destroy({where: {id: requestCancelId}})
            .then(()=>{
                res.redirect('/hirers');
            })
            .catch((err) =>{
                res.send(err);
            })
    }

    static giveRating(req, res){
        let request = {
            id : req.params.id,
            newRating: req.body.rating
        }
        Request.findOne({where: {id: request.id}, include: [Actor]})
            .then((data) =>{
                return Actor.findOne({where: {id: data.Actor.id}})
            })
            .then((data)=>{
                const newR = {
                    reputation: newRating(request.newRating, data.reputation, data.jobsDone),
                    jobsDone: data.jobsDone+1
                }
                return Actor.update(newR, {where:{id: data.id}})
            })
            .then(()=>{
                return Request.destroy({where: {id: request.id}})
            })
            .then(()=>{
                res.redirect('/hirers')
            })
            .catch((err)=>{
                res.send(err);
            })
    }
}

module.exports = Controller;