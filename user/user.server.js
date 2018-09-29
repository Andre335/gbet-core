"use strict"

const User = require("./user.model");

exports.findAll = async (data) => {
    return await User.find({});
};

exports.findOne = async (id) => {
    return await User.findById(id);
};

exports.create = async (data) => {
    const user = new User(data);
    await user.save();
};

exports.update = async (id, data) => {
    await User.findByIdAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
    await User.findByIdAndDelete(id);
};