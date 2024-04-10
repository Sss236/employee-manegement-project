const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    registrationToken: String,
    registrationExpires: Date,
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    registrationLink: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Unsubmitted', 'Submitted'],
        required: true,
        default: 'Unsubmitted'
    }
});

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;