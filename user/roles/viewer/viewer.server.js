"use strict"

const Viewer = require("./viwer.model");

exports.findAll = async (data) => {
    return await Viewer.find({});
};

exports.findOne = async (id) => {
    return await Viewer.findById(id);
};

exports.create = async (data) => {
    const viewer = new Viewer(data);
    await viewer.save();
};

exports.update = async (id, data) => {
    await Viewer.findByIdAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
    await Viewer.findByIdAndDelete(id);
};