'use strict';
var Complaint = require('./complaint.server')
var User = require('../user/user.server')

exports.findAll = async (req, res) => {
    try {
        const result = await Complaint.findAll();
        if (result.length == 0) res.status(404).send({message: "Complaints not found"})
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.findOne = async (req, res) => {
    try {
        const complaintID = req.params.id;
        const result = await Complaint.findOne(complaintID);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send({message: "Complaint not found"});
        }
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        const authorID = req.body.author;
        const authorResult = await User.findOne(authorID);
        if (!authorResult) return res.status(404).send({message: "Author from complaint not found"});

        const accusedID = req.body.accused;
        const accusedResult = await User.findOne(accusedID);
        if (!accusedResult) return res.status(404).send({message: "Accused from complaint not found"});

        await Complaint.create(req.body);
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.deleteById = async (req, res) => {
    try {
        const complaintID = req.params.id;
        await Complaint.deleteById(complaintID);
        res.status(202).send({message: "Complaint deleted"});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.update = async (req, res) => {
    try {
        const complaintID = req.params.id;
        await Complaint.update(complaintID, req.body);

        const updatedComplaint = await Complaint.findOne(complaintID);
        res.status(202).json(updatedComplaint); 
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}