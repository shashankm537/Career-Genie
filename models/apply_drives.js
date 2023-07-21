const mongoose = require('mongoose');

const apply_drivesSchema = new mongoose.Schema({
    applicant: {
        type: String,
        required: true,
        ref: 'Student'
    },
    drives_applied: {
        type: Number,
        required: true,
        ref: 'Drive'
    }
});

module.exports = mongoose.model('Apply_drive', apply_drivesSchema);
