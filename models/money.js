const mongoose = require('mongoose');

const moneySchema = new mongoose.Schema({
    money: {
        type: Number
    },
});


const Money = mongoose.model('money', moneySchema);

module.exports = Money;