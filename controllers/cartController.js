const Cart = require('../models/cartSchema');
const Price = require('../models/totalPrice');
const Money = require('../models/money');

module.exports.addToCart = async (req,res) => {
    let product = await Cart.findOne({product: req.body.product}).lean();
    let quantity = await Cart.updateOne(product, {$inc: {cart__quantity: req.body.cart__quantity}});
    let finalProductPrice = await Cart.updateOne(product, {$inc: {cart__price: quantity*cart__price}});
    if(product) await Price.updateOne({}, {$inc: {totalPrice: finalProductPrice.cart__price}});
    return res.redirect('back');
};


module.exports.buyNow = async (req,res) => {
    const totalPrice = await Price.findOne({totalPrice: req.body.totalPrice});
    const availBalance = await Money.findOne({money: req.user.money});
    if(availBalance >= totalPrice){
        await Money.updateOne(availBalance, {$set: {money: req.user.money-totalPrice}});
        return res.redirect('done');
    }
}