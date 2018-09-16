'use strict'

var Schema = mongoose.Schema;

var calendarSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    favourites: {
        type: [String],
        required: false
    }
});

var Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;