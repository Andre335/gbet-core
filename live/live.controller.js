'use strict';
var User = require('../user/user.server');
var Live = require('./live.server');
var Bet = require('../bet/bet.server');

exports.findAll = async (req, res) => {
    try {
        const result = await Live.findAll();
        if (result.length == 0) return res.status(404).send({message: "Lives not found"})
        for (var i = 0; i < result.length; i++) {
            result[i].bets = await Bet.findByLive(result[i]["_id"]);
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.findOne = async (req, res) => {
    try {
        const liveID = req.params.id;
        const liveResult = await Live.findOne(liveID);
        if (!liveResult) return res.status(404).send({message: "Live not found"});
        liveResult.bets = await Bet.findByLive(liveID);
        res.status(200).json(liveResult);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        await Live.create(req.body);
        res.status(201).json(req.body);
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

        const updatedLive = await Live.findOne(liveID);
        res.status(202).json(updatedLive); 
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.findBetsByLive = async (req, res) => {
    try {
        const liveID = req.params.id;
        const result = await Bet.findByLive(liveID);
        if (result.length == 0) {
            res.status(404).send({message: "This live dont have bets"});
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}