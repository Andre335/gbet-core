'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var betSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    live_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    value: {
        type: Number,
        required: false
    }
});

var Bet = mongoose.model('Bet', betSchema);
module.exports = Bet;