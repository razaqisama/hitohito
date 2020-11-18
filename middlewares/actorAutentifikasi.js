function autentifikasi (req, res, next){
    if(req.session.username){
        next();
    } else {
        res.send('Anda harus login dulu')
    }
}

module.exports = autentifikasi