'use strict'
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/production', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    role: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;