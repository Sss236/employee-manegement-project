const mongoose = require('mongoose');
 
const employeeDetail = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
})