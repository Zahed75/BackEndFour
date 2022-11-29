const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({
    phone: {type: String, unique: true},
    firstName: {type: String, max: 20},
    role: {type: String, max: 30},
    city: {type: String},
    bloodGroup: {type: String},
    password: {type: String}

}, {versionKey: false})

const UserModel = mongoose.model('users', DataSchema)

module.exports = UserModel