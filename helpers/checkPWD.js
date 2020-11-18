const bcrypt = require('bcryptjs');

function check (raw, hash){
    return bcrypt.compareSync(raw, hash);
}

module.exports = check;