'use strict';
var User = require('../user/user.server');
var Live = require('../live/live.server');
var Bet = require('./bet.server')

exports.findAll = async (req, res) => {
    try {
        const result = await Bet.findAll();
        if (result.length == 0) res.status(404).send({message: "Bets not found"})
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.findOne = async (req, res) => {
    try {
        const betID = req.params.id;
        const betResult = await Bet.findOne(betID);
        if (!betResult) res.status(404).send({message: "Bet not found"});
        res.status(200).json(betResult);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        const userID = req.body.owner;
        const userResult = await User.findOne(userID);
        if (!userResult) return res.status(404).send({message: "User from Bet not found"});

        const liveID = req.body.live;
        const liveResult = await Live.findOne(liveID);
        if (!liveResult) return res.status(404).send({message: "Live from Bet not found"});

        await Bet.create(req.body);
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.deleteById = async (req, res) => {
    try {
        const betId = req.params.id;
        await Bet.deleteById(betId);
        res.status(202).send({message: "Bet deleted"});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.update = async (req, res) => {
    try {
        const betID = req.params.id;
        await Bet.update(betID, req.body);
        const updatedBet = await Bet.findOne(betID);
        res.status(202).json(updatedBet); 
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}