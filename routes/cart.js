const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/addToCart/:price', cartController.addToCart);
// router.post('/buy', cartController.buyNow);
router.get('/cart', cartController.cartPage);
module.exports = router;