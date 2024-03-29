const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        require: true
    },

    price: {
        type: Number,
        require: true
    },

    thumbnail: {
        type: String,
        default: 'Sin Imagen'
    },

    code: {
        type: String,
        unique: true,
        require: true
    },

    status: {
        type: Boolean,
        require: true,
        default: true
    },

    stock: {
        type: Number,
        require: true
    }
});

schema.virtual('id').get(function () {
    return this._id.toString()
});

module.exports = mongoose.model('Products', schema, 'product');