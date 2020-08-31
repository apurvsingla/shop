const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    price: {
        type: Number
    },
    quantity: {
        type: Number,
        default: 1
    },
    winter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'winterCollection',
    },
    summer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SummerCollection'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});


const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;