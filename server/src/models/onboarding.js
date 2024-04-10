const mongoose = require('mongoose');

const onboardingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Unsubmitted', 'Pending', 'Approved', 'Rejected'],
        required: true,
        default: 'Unsubmitted'
    },
    feedback: { type: String },
    personalInfoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalInfo'
    }
});

const Onboarding = mongoose.model('Onboarding', onboardingSchema);
module.exports = Onboarding;