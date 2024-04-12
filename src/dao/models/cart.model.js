const mongoose = require('mongoose');

const collection = 'Carts'

const schema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 0
        }
    }]
});

schema.virtual('id').get(function () {
    return this._id.toString()
});

module.exports = mongoose.model(collection, schema, 'carts');