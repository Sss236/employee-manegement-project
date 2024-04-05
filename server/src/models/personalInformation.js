const mongoose = require('mongoose');

const personalInformationSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    preferredName: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    },
    email: {
        type: String, // can't change?
    },
    SSN: {
        type: String,
        required: true,
        match: [/^\d{3}-\d{2}-\d{4}$/, 'Please enter a valid SSN']
    }
})