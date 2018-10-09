'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var streammerSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    lives: {
        type: [Schema.Types.ObjectId],
        required: false
    }
});

var Streammer = mongoose.model('Streammer', streammerSchema);
module.exports = Streammer;