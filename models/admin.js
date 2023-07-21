const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email cannot be blank'],   //feedback
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    }
})

module.exports = mongoose.model('Admin', adminSchema);
