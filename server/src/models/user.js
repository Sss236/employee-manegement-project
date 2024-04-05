const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { // employee or hr
        type: String,
        required:true
    },
    status: {
        type: String, // registration / onboarding / personal information / visa status management
        required: true
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;