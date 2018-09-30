"use strict"

const Live = require("./live.model");

exports.findAll = async (data) => {
    return await Live.find({}, (err) => {
        if (err) throw err;
    });
};

exports.findByOwner = async (id) => {
    return await Live.find({"owner": id});
};

exports.findOne = async (id) => {
    return await Live.findById(id);
};

exports.create = async (data) => {
    const live = new Live(data);
    await live.save();
};

exports.update = async (id, data) => {
    await Live.findByIdAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
    await Live.findByIdAndDelete(id);
};