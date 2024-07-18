const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    rol: {
        type: String,
        default: 'user'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carts'
    },
    last_connection: String,
    documents: [
        {
            name: String,
            reference: String
        }
    ]

})

module.exports = mongoose.model('Users', schema, 'users')