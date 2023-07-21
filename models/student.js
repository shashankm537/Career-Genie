const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    usn: {
        type: String,
        required: [true, 'USN cannot be blank'],   //feedback
        unique: true
    },
    firstname: {
        type: String,
        required: [true, 'First name cannot be blank']   //feedback
    },
    lastname: {
        type: String
    },
    gender: {
        type: String,
        required: [true, 'Gender cannot be blank']
    },
    branch: {
        type: String,
        required: [true, 'Branch cannot be blank']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],   //feedback
        unique: true
    },
    phone: {
        type: Number,
        required: [true, 'Phone cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    },
    active: {
        type: Number,
        default: 2
    },
    tenth: {
        type: String,
        required: [true, 'Tenth cannot be blank']
    },
    twelfth: {
        type: String,
        required: [true, 'Twelfth cannot be blank']
    },
    cgpa: {
        type: String,
        required: [true, 'Cgpa cannot be blank']
    },
    skills: {
        type: String,

    },
    backlogs: {
        type: Number
    },
    grad: {
        type: Number,
        required: [true, 'Graduation year cannot be blank']
    },
    dob: {
        type: Date,
        required: [true, 'Date cannot be blank']
    },
    age: {
        type: Number,
        required: [true, 'Age field cannot be blank']
    },
    address: {
        type: String,
        required: [true, 'Address cannot be blank']
    },
    state: {
        type: String,
        required: [true, 'State cannot be blank']
    },
    applied_events: [{ type: Number, ref: 'Event' }]
})

module.exports = mongoose.model('Student', studentSchema);
