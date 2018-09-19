'use strict';
var User = require('./user.model')

exports.findAll = (req, res) => {
    User.find().then(data => {
        if(data.length == 0) {
            return res.status(404).send(data);
        }

        res.status(200).send(data);
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

        res.status(200).send(data[0]);
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
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        email: req.body.email,
        banned: false
    });

    newUser.save(err => {
        if (err) return res.status(500).send(err.message);
        return res.status(200).send(newUser);
    });
}

exports.deleteById = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, data) => {
        if(err && err.kind === 'ObjectId') return res.status(500).send("User not found!");
        res.status(200).send(data);
    });
}

exports.update = (req, res) => {
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        email: req.body.email
    };

    User.findByIdAndUpdate(req.params.id, { $set: updatedUser}, { new: true }, (err, user) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Server Error!"
            });
        }
        res.status(200).send(user);
    });
}

exports.getStatusMessage = (status, reqMethod) => {
    if (status === 404) {
        return "User doesn't exist!";
    } else if (status === 500) {
        return "Error " + reqMethod + " user!";
    }
}