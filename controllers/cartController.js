const Cart = require('../models/cartSchema');
const Price = require('../models/totalPrice');
const Money = require('../models/money');

module.exports.addToCart = async (req,res) => {
    let prevItem = await (await Cart.findOne({price: req.params.price}));
    if(prevItem){
        await Cart.updateOne({}, {$inc: {price: req.params.price, quantity: 1}});
    }else{
        await Cart.create({price: req.params.price});
        console.log('sada')
    }
    return res.redirect('back');
};


module.exports.cartPage = async (req,res) => {
    let cart = await Cart.findOne({});
    console.log(cart)
    return res.render('cart', {
        title: "Cart",
        data: cart
    })
}