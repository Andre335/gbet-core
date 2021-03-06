"use strict"

const Live = require("./live.model");

exports.findAll = async (data) => {
    return await Live.find({});
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

exports.drop = async () => {
    await Live.collection.drop();
};