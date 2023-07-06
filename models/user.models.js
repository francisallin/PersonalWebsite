const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String
},{
    timestamps: true
});
//creates a collection of particular db of mongodb
//return the mongoose obj
module.exports = mongoose.model('Login', UserSchema);