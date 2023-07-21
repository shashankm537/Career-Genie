const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const driveSchema = new mongoose.Schema({
    drive_id: {
        type: Number,
        unique: true
    },
    company_name: {
        type: String,
        required: [true, 'Company name cannot be blank']   //feedback
    },
    offer: {
        type: String,
        required: [true, 'Offer cannot be blank']
    },
    ctc: {
        type: String,
        required: [true, 'CTC cannot be blank']
    },
    job_desc: {
        type: String,
        required: [true, 'Job Description cannot be blank']
    },
    date_of_recruitment: {
        type: Date,
        required: [true, 'Date cannot be blank']
    },
    comp_desc: {
        type: String,
        required: [true, 'Company Description cannot be blank']
    },
    last_date: {
        type: Date,
        required: [true, 'Last Date cannot be blank']
    },
    cgpa: {
        type: Number,

    }

})



module.exports = mongoose.model('Drive', driveSchema);