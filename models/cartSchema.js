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
    }
});


const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;