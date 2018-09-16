'use strict'

var Schema = mongoose.Schema;

var complaintSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true
    },
    accused: {
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
        required: true
    }
});

var Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;