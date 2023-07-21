const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
    notification_id: {
        type: Number,
        unique: true
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Notifications', notificationsSchema);