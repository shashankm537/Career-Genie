const mongoose = require('mongoose');

const pcSchema = new mongoose.Schema({

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
    grad: {
        type: Number,
        required: [true, 'Graduation year cannot be blank']
    },
    skills: {
        type: String,

    }

})

module.exports = mongoose.model('Pc', pcSchema);
