const Cart = require('../models/cartSchema');
const User = require('../models/userSchema');
const instance = require('../config/razorpay');
const request = require('request');

module.exports.addToCart = async (req,res) => {
    if(req.isAuthenticated()){
        let prevItem = await Cart.findOne({email: req.user.email});
        if(prevItem){
            let cart = await Cart.updateOne({email: req.user.email}, {$inc: {price: req.params.price, quantity: 1}});
            await User.updateOne({id:req.user._id}, {$set: {cart: cart._id}})
        }else{
            let cart = await Cart.create({price: req.params.price, user:req.user._id, email: req.user.email});
            await User.updateOne({email:req.user.email}, {$set: {cart: cart._id}})
        }
        
        return res.redirect('back');
    }
    return res.redirect('/auth/login');
};


module.exports.cartPage = async (req,res) => {
    if(req.isAuthenticated()){
        let cart = await Cart.findOne({user: req.user._id}).populate('user');   
        return res.render('cart', {
            title: "Cart",
            data: cart
        })
    }else{
        return res.redirect('/auth/login');
    } 
}


//payment :razorpay

// module.exports.payment = (req,res) => {
//     instance.orders.create(params).then((data) => {
//         res.send({"sub" : data, "status": "success"});
//     }).catch((err)=> {
//         res.send({"sub": err, "status": 'failed'});
//     })
// }

// module.exports.verify = (req,res) => {
//     let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
//     const crypto = require('crypto');
//     let expectedSignature = crypto.createHmac('sha256', '')
//     .update(body.toString()).digest('hex');
//     console.log('sig' + req.body.razorpay_signature);
//     console.log(expectedSignature);
//     const response = {"status": "failure"}
//     if(expectedSignature === req.body.razorpay_signature)
//         response={"status": "success"}
//             res.send(response)
// }
// module.exports.payment = async (req,res) =>{
//         try {
//             let cart  = await Cart.findOne({email: req.user.email});
//           const options = {
//             amount: cart.price*10, // amount == Rs 10
//             currency: "INR",
//             receipt: cart.id,
//             payment_capture: 1,
//        // 1 for automatic capture // 0 for manual capture
//           };
//         instance.orders.create(options, async function (err, order) {
//           if (err) {
//               console.log(err)
//             return res.status(500).json({
//               message: "Something Went Wrong",
//             });
//           }
//         return res.status(200).json(order);
//        });
//       } catch (err) {
//         return res.status(500).json({
//           message: "Something Went Wrong",
//         });
//     };
// };

// module.exports.callback = async(req,res) => {
//         try {
//             let cart = Cart.findOne({email:req.user.email});
//           return request(
//            {
//            method: "POST",
//            
//            form: {
//               amount: cart.price, // amount == Rs 10 // Same As Order amount
//               currency: "INR",
//             },
//           },
//          async function (err, response, body) {
//            if (err) {
//                console.log(err)
//             return res.status(500).json({
//                message: "Something Went Wrong",
//              }); 
//            }
//             console.log("Status:", response.statusCode);
//             console.log("Headers:", JSON.stringify(response.headers));
//             console.log("Response:", body);
//             return res.status(200).json(body);
//           });
//         } catch (err) {
//             console.log(err)
//           return res.status(500).json({
//             message: "Something Went Wrong",
//          });
//         }      
// }