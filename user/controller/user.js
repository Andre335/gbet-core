'use strict';
var User = require('../model/user')

exports.findAll = function(req, res) {
    console.log("Finding");
    User.find().then(data => {
        console.log("Finding User suceeded");
        res.send(data);
    }).catch(err => {
        console.log("Finding User didn't suceeded");
        res.status(500).send({
            message: err.message || "We couldn't find users"
        });
    });
};

exports.create = (req, res) => {
    console.log("Creating");
    if(!req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            message: "First Name and Last Name should be informed!"
        });
    }

    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role
    });

    console.log("New User: " + newUser);

    newUser.save().then(data => {
        console.log("Creating User suceeded");
        res.send(data);
    }).catch(err => {
        console.log("Creating User didn't suceeded");
        res.status(500).send({
            message: err.message || "We couldn't create the user!"
        });
    });
}