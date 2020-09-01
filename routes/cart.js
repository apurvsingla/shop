const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/addToCart/:price', cartController.addToCart);
// router.post('/buy', cartController.buyNow);
router.get('/cart', cartController.cartPage);
// router.get('/submit', cartController.payment);
// router.post("/submit/:userId", cartController.callback);
// router.post('/submit/payment/order', cartController.payment)
module.exports = router;