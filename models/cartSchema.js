const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product: {
        type: String
    },
    cart__price: {
        type: Number
    },
    cart__quantity: {
        type: Number
    },
    winter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'winterCollection'
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