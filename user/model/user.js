'use strict'
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/production', { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('Connection to the database estabilished!');
// });

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    role: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;