'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var calendarSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    favourites: [{
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Live'
    }]
});

var Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;