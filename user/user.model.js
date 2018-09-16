'use strict'
let mongoose = require('mongoose');

mongoose.connect('mongodb://angoncal:Andre95153565@ds155292.mlab.com:55292/gbet', { useNewUrlParser: true });

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: false
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;