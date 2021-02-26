const bcrypt = require('bcryptjs')

function hashingPassword (password) {
 const salt = bcrypt.genSaltSync(8)
 const hashedPassword = bcrypt.hashSync(password, salt);
 return hashedPassword
}

function comparePassword (input, hash) {
    return bcrypt.compareSync(input, hash)
}

module.exports = {
    hashingPassword, comparePassword
}