const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

//render page
router.get('/summer', productController.summer);
router.get('/winter', productController.winter);

//post image
router.get('/summerImage', productController.summerPage);
router.get('/winterImage', productController.winterPage);
router.post('/auth/uploadSummerImage/:id', productController.uploadSummerImage);
router.post('/auth/uploadWinterImage/:id', productController.uploadWinterImage);

module.exports = router;