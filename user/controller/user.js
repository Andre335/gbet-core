'use strict';
var User = require('../model/user')

exports.findAll = (req, res) => {
    User.find().then(data => {
        if(data.length == 0) {
            return res.status(404).send({
                message: "User doesn't exist!"
            });
        }

        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "We couldn't find users"
        });
    });
};

exports.findOne = (req, res) => {
    User.find({"_id": req.params.id}).then(data => {
        if(data.length == 0) {
            return res.status(404).send({
                message: "User doesn't exist!"
            });
        }

        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            var status = 404;
            return res.status(status).send({
                message: getStatusMessage(status, "find")
            });            
        } else {
            var status = 500;
            return res.status(status).send({
                message: getStatusMessage(status, "find")
            });
        }
    });
};

exports.create = (req, res) => {
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

    newUser.save().then(data => {
        if(data.length == 0) {
            return res.status(404).send({
                message: "User doesn't exist!"
            });
        }

        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "We couldn't create the user!"
        });
    });
}

exports.deleteById = (req, res) => {
    User.findByIdAndRemove({_id: req.params.id}).then(data => {
        if(data.length == 0) {
            return res.status(404).send({
                message: "User doesn't exist!"
            });
        }

        res.send({message: "User deleted!"});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            var status = 404;
            return res.status(status).send({
                message: getStatusMessage(status, "delete")
            });                
        } else {
            var status = 500;
            return res.status(status).send({
                message: getStatusMessage(status, "delete")
            });
        }
    });
}

exports.update = (req, res) => {
    if(!req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            message: "First Name and Last Name should be informed!"
        });
    }

    User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role
    }).then(data => {
        if(data.length == 0) {
            return res.status(404).send({
                message: "User doesn't exist!"
            });
        }

        res.send("User updated!");
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            var status = 404;
            return res.status(status).send({
                message: getStatusMessage(status, "update")
            });                
        } else {
            var status = 500;
            return res.status(status).send({
                message: getStatusMessage(status, "update")
            });
        }
    });
}

exports.getStatusMessage = (status, reqMethod) => {
    if (status === 404) {
        return "User doesn't exist!";
    } else if (status === 500) {
        return "Error " + reqMethod + " user!";
    }
}