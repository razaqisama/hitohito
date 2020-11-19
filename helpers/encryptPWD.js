const bcrypt = require('bcryptjs');

function encryptPWD(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function check (raw, hash){
    return bcrypt.compareSync(raw, hash);
}


module.exports = {encryptPWD, check};