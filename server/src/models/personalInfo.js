const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
    type: { // onboarding or personalInfo
        type: String,
        required: true
    },
    visaStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisaStatus'
    },
    documents: [{
        profilePicture: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        },
        optReceipt: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        },
        driversLicense:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        },
    }],
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    preferredName: {
        type: String,
    },
    currentAddress : {
        building: { type: String },
        street: { type: String },
        city: { type: String },
        state: {type: String },
        zip: { type: String }
    },
    phone: {
        cell: { type: String, required: true },
        work: { type: String }
    },
    email: {
        type: String,
        required: true,
        immutable: true  // can't change
    },
    ssn: {
        type: String,
        required: true,
        match: [/^\d{3}-\d{2}-\d{4}$/, 'Please enter a valid SSN']
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'I do not wish to answer'],
        required: true,
    },
    usResidentStatus: {
        isResidentOrCitizen: { type: Boolean, required: true },
        status: { type: String, enum:['Green Card', 'Citizen', 'None'], default: 'None'},
        workAuthorization: {
            type: {
                type: String,
                enum: ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'],
                required: true
            },
            
            otherVisaTitle: { type: String },
            startDate: { type: Date },
            endDate: { type: Date }
        },
        reference: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            middleName: { type: String },
            phone: { type: String },
            email: { type: String },
            relationship: { type: String, required: true }
        },
        emergencyContacts: [{
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            middleName: { type: String },
            phone: { type: String },
            email: { type: String },
            relationship: { type: String, required: true }
        }]
    },
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);
module.exports = PersonalInfo;