const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    number: String
},{
    timestamps: true
});
//creates a collection of particular db of mongodb
//return the mongoose obj
module.exports = mongoose.model('Contact', ContactSchema);