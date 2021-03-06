"use strict"

const Bet = require("./bet.model");

exports.findAll = async (data) => {
    return await Bet.find({});
};

exports.findOne = async (id) => {
    return await Bet.findById(id);
};

exports.findByOwner = async (id) => {
    return await Bet.find({"owner": id});
};

exports.findByLive = async (id) => {
    return await Bet.find({"live": id});
};

exports.create = async (data) => {
    const bet = new Bet(data);
    await bet.save();
};

exports.update = async (id, data) => {
    await Bet.findByIdAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
    await Bet.findByIdAndDelete(id);
};

exports.drop = async () => {
    await Bet.collection.drop();
};