const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    totalPrice: {
        type: Number
    },
});


const Price = mongoose.model('price', priceSchema);

module.exports = Price;