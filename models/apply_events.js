const mongoose = require('mongoose');

const apply_eventsSchema = new mongoose.Schema({
    applicant: {
        type: String,
        required: true,
        ref: 'Student'
    },
    events_applied: {
        type: Number,
        required: true,
        ref: 'Event'
    }
});

module.exports = mongoose.model('Apply_event', apply_eventsSchema);
//module.exports = mongoose.model('Pc', pcSchema);