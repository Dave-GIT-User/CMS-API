
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    imageUrl: { type: String },
    group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
    hash: { type: String, required: true },
    admin: { type: String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);

