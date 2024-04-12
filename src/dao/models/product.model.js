const mongoose = require('mongoose');

const collection = 'Products'

const schema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 1
    },

    thumbnail: {
        type: String,
        default: 'Sin Imagen'
    },

    code: {
        type: String,
        unique: true,
        required: true
    },

    status: {
        type: Boolean,
        enum: [true, false],
        default: true
    },

    stock: {
        type: Number,
        required: true,
        min: 0
    }
});

schema.virtual('id').get(function () {
    return this._id.toString()
});

module.exports = mongoose.model(collection, schema, 'products');