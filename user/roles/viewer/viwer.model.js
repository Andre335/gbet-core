'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var viwerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    favourite_lives: {
        type: [Schema.Types.ObjectId],
        required: false
    },
    favourite_streammers: {
        type: [Schema.Types.ObjectId],
        required: false
    },
    bets: {
        type: [Schema.Types.ObjectId],
        required: false
    }
});

var Viewer = mongoose.model('Viewer', viwerSchema);
module.exports = Viewer;