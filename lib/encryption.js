const bcrypt = require("bcrypt")

exports.encrypt = async(password) => {
    if (!password) return "";
    return await bcrypt.hash(password, 10)
        //transform to a hash-password with 10 characters encrypted for the user
}

exports.compare = async(password, hash) => {
        return bcrypt.compare(password, hash)
    }
    //compare the passwords if they are the same or not