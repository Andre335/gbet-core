'use strict';
var User = require('../user/user.server');
var Calendar = require('./calendar.server');

exports.findAll = async (req, res) => {
    try {
        const result = await Calendar.findAll();
        if (result.length == 0) res.status(404).send({message: "Calendar not found"})
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.findOne = async (req, res) => {
    try {
        const calendarID = req.params.id;
        const calendarResult = await Calendar.findOne(calendarID);
        if (!calendarResult) res.status(404).send({message: "Calendar not found"});
        res.status(200).json(calendarResult);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        const userID = req.body.owner;
        const userResult = await User.findOne(userID);
        if (!userResult) return res.status(404).send({message: "User from calendar not found"});
        if (!req.body.favourites) return res.status(500).send({message: "Must have favourites"});
        await Calendar.create(req.body);
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.deleteById = async (req, res) => {
    try {
        const calendarID = req.params.id;
        await Calendar.deleteById(calendarID);
        res.status(202).send({message: "Calendar deleted"});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.update = async (req, res) => {
    try {
        const calendarID = req.params.id;
        await Calendar.update(calendarID, req.body);

        const updatedCalendar = await Calendar.findOne(calendarID);
        res.status(202).json(updatedCalendar); 
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}