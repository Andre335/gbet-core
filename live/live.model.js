'use strict'
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var liveSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    bets: [{
        type: [Schema.Types.ObjectId],
        ref: 'Bet'
    }]
});

var Live = mongoose.model('Live', liveSchema);
module.exports = Live;