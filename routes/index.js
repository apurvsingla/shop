const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

router.get('/', homeController.home);
router.get('/shop-cart', homeController.cart);
router.get('/done', homeController.done);
router.get('/admin', homeController.admin);
//use
router.use('/auth', require('./auth'));
router.use('/', require('./cart'));
router.use('/', require('./product'));
module.exports = router;