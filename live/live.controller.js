'use strict';
var User = require('../user/user.model');
var Live = require('./live.model')

exports.findAll = (req, res) => {
    Live.find().then(data => {
        if(data.length == 0) {
            return res.status(404).json(data);
        }

        res.status(200).json(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "We couldn't find lives"
        });
    });
};

exports.findOne = (req, res) => {
    User.find({"_id": req.params.owner}).then((data, err) => {
        if (err) return res.status(500).send(err.message);
        else if (data.length == 0) return res.status(404).send({ message: "Live not found" });
    });

    Live.find({"_id": req.params.id}).then((data, err) => {
        if(data.length == 0) {
            return res.status(404).json(data);
        }

        if(err.kind === 'ObjectId') {
            var status = 404;
            return res.status(status).send({
                message: getStatusMessage(status, "find")
            });            
        } else if (err) {
            var status = 500;
            return res.status(status).send({
                message: getStatusMessage(status, "find")
            });
        }

        res.status(200).send(data[0]);
    });
};

exports.create = (req, res) => {
    const newLive = new User({
        owner: req.body.owner,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    });

    newLive.save(err => {
        if (err) return res.status(500).send(err.message);
        return res.status(201).json(newLive);
    });
}

exports.deleteById = (req, res) => {
    User.find({"_id": req.params.owner}).then((data, err) => {
        if (err) return res.status(500).send(err.message);
        else if (data.length == 0) return res.status(404).send({ message: "Live don't have user found" });
    });
    
    Live.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(500).send({ message: "Server Error" });
        else if (data == null || data.length == 0) return res.status(404).send({ message: "Live not found" });
        else return res.status(200).send(data);
    });
}

exports.update = (req, res) => {
    User.find({"_id": req.params.owner}).then((data, err) => {
        if (err) return res.status(500).send(err.message);
        if (data.length == 0) return res.status(404).send({ message: "Live not found" });
    });

    const updatedLive = new User({
        owner: req.body.owner,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    });

    Live.findByIdAndUpdate(req.params.id, { $set: updatedLive}, { new: true }, (err, live) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Server Error!"
            });
        }
        res.status(200).send(live);
    });
}

exports.getStatusMessage = (status, reqMethod) => {
    if (status === 404) {
        return "Live doesn't exist!";
    } else if (status === 500) {
        return "Error " + reqMethod + " live!";
    }
}