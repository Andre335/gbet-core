'use strict'
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    if (this.password) {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;