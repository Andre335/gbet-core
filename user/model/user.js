'use strict'
let mongoose = require('mongoose');

mongoose.connect('mongodb://angoncal:Andre95153565@ds155292.mlab.com:55292/gbet', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    role: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;