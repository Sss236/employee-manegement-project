const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    name: { type: String, required: true},
    url: { type: String, required: true },
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;