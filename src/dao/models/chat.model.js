const mongoose = require('mongoose');

const collection = 'Messages';

const schema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        require: true
    },
    messages: {
        type: Array
    }
}, { timestamps: true });

module.exports = mongoose.model(collection, schema, 'messages');