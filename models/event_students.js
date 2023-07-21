const mongoose = require('mongoose');

const event_studentsSchema = new mongoose.Schema({
    stuusn: {
        type: String,
        required: [true, 'USN cannot be blank'],   //feedback

    },
    stufirstname: {
        type: String,
        required: [true, 'First name cannot be blank']   //feedback
    },
    stulastname: {
        type: String
    },
    stubranch: {
        type: String,
        required: [true, 'Branch cannot be blank']
    },
    stuemail: {
        type: String,
        required: [true, 'Email cannot be blank'],   //feedback

    },
    stuevent_name: {
        type: String,
        required: [true, 'Event name cannot be blank']   //feedback
    },
    stucompany_name: {
        type: String,
        required: [true, 'Company name cannot be blank']
    },
    studate_of_event: {
        type: Date,
        required: [true, 'Date cannot be blank']
    },
})


module.exports = mongoose.model('Event_student', event_studentsSchema);