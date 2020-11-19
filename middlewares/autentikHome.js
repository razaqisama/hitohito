function autentikHome (req, res, next){
    if(req.session.actorId){
        res.redirect('/actors');
    } else if (req.session.hirerId){
        res.redirect('/hirers')
    } else {
        next();
    }
}

module.exports = autentikHome