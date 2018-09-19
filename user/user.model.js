'use strict'
var mongoose = require('mongoose');

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
    },
    banned: {
        type: Boolean,
        required: false
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;