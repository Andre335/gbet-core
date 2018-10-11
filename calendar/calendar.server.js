"use strict"

const Calendar = require("./calendar.model");

exports.findAll = async (data) => {
    return await Calendar.find({});
};

exports.findByOwner = async (id) => {
    return await Calendar.find({"owner": id});
};

exports.findOne = async (id) => {
    return await Calendar.findById(id);
};

exports.create = async (data) => {
    const calendar = new Calendar(data);
    await calendar.save();
};

exports.update = async (id, data) => {
    await Calendar.findByIdAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
    await Calendar.findByIdAndDelete(id);
};

exports.drop = async () => {
    await Calendar.collection.drop();
};