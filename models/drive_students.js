const mongoose = require('mongoose');

const drive_studentsSchema = new mongoose.Schema({
    stu_usn: {
        type: String,
        required: [true, 'USN cannot be blank'],   //feedback

    },
    stu_firstname: {
        type: String,
        required: [true, 'First name cannot be blank']   //feedback
    },
    stu_lastname: {
        type: String
    },
    stu_branch: {
        type: String,
        required: [true, 'Branch cannot be blank']
    },
    stu_email: {
        type: String,
        required: [true, 'Email cannot be blank'],   //feedback

    },
    stu_company_name: {
        type: String,
        required: [true, 'Company name cannot be blank']
    },
    stu_date_of_recruitment: {
        type: Date,
        required: [true, 'Date cannot be blank']
    },
    stu_offer: {
        type: String,
        required: [true, 'Offer cannot be blank']
    },
})




module.exports = mongoose.model('Drive_student', drive_studentsSchema);