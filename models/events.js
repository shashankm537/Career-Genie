const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const eventSchema = new mongoose.Schema({
    event_id: {
        type: Number,
        unique: true
    },
    event_name: {
        type: String,
        required: [true, 'Event name cannot be blank']   //feedback

    },
    company_name: {
        type: String,
        required: [true, 'Company name cannot be blank']
    },
    date_of_event: {
        type: Date,
        required: [true, 'Date cannot be blank']
    },
    event_desc: {
        type: String,
        required: [true, 'Event name cannot be blank'],
    },
    applied_events: [{ type: Number, ref: 'Apply_event' }]
})



module.exports = mongoose.model('Event', eventSchema);