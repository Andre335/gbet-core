'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var betSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    live: {
        type: Schema.Types.ObjectId,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    in_favor: {
        type: Boolean
    }
});

var Bet = mongoose.model('Bet', betSchema);
module.exports = Bet;