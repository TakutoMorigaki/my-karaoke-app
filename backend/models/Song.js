const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    username: { type: String, required: true},
    title: { type: String, required: true },
    artist: { type: String, required: true},
    category: { type: String, required: true},
    priority: { type: String, required: true},
    url: { type: String, default: ''},
    memo: { type: String , default: ''}
}, {timestamps: true});

module.exports = mongoose.model('Song', songSchema);