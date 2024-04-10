const mongoose = require('mongoose');
 
const visaStatusSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    currentStep: {
        type: String,
        enum: ['OPT Receipt', 'OPT EAD', 'I-983', 'I-20', 'Completed'],
        required: true
    },
    status:{
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
        required: true
    },
    feedback: { type: String },
    documents: {
        optReceipt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        },
        optEAD: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        },
        i983: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        },
        i20: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        },
    },
    personalInfoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PersonalInfo'
    }
});

const VisaStatus = mongoose.model('VisaStatus', visaStatusSchema);
module.exports = VisaStatus;