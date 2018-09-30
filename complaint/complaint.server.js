"use strict"

const Complaint = require("./complaint.model");

exports.findAll = async (data) => {
    return await Complaint.find({});
};

exports.findOne = async (id) => {
    return await Complaint.findById(id);
};

exports.findByAuthor = async (id) => {
    return await Complaint.find({"author": id});
};

exports.create = async (data) => {
    const complaint = new Complaint(data);
    await complaint.save();
};

exports.update = async (id, data) => {
    await Complaint.findByIdAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
    await Complaint.findByIdAndDelete(id);
};