"use strict"

const Streammer = require("./streammer.model");

exports.findAll = async (data) => {
    return await Streammer.find({});
};

exports.findOne = async (id) => {
    return await Streammer.findById(id);
};

exports.create = async (data) => {
    const streammer = new Streammer(data);
    await streammer.save();
};

exports.update = async (id, data) => {
    await Streammer.findByIdAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
    await Streammer.findByIdAndDelete(id);
};