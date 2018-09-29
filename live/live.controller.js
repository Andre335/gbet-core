'use strict';
var User = require('../user/user.server');
var Live = require('./live.server')

exports.findAll = async (req, res) => {
    try {
        const result = await Live.findAll();
        if (result.length == 0) res.status(404).send({message: "Lives not found"})
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.findOne = async (req, res) => {
    try {
        const liveID = req.params.id;
        const liveResult = await Live.findOne(liveID);
        if (!liveResult) res.status(404).send({message: "Live not found"});

        const userID = liveResult.owner;
        const userResult = await User.findOne(userID);
        if (!userResult) {
            res.status(404).send({message: "User from live not found"});
        } else {
            res.status(200).json(liveResult);
        }
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        const userID = req.body.owner;
        const userResult = await User.findOne(userID);
        if (!userResult) return res.status(404).send({message: "User from live not found"});
        await Live.create(req.body);
        res.status(201).send({message: "Live created"});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.deleteById = async (req, res) => {
    try {
        const liveID = req.params.id;
        await Live.deleteById(liveID);
        res.status(202).send({message: "Live deleted"});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.update = async (req, res) => {
    try {
        const liveID = req.params.id;
        await Live.update(liveID, req.body);
        res.status(202).send({message: "Live updated"}); 
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}