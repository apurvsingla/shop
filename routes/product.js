const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

//render page
router.get('/summer', productController.summer);
router.get('/winter', productController.winter);
router.get('/summer/products', productController.summerProduct);
router.get('/winter/products', productController.winterProduct)
//product page
router.get('/summer/collection', productController.summerCollection);

//post image
router.get('/summerImage', productController.summerPage);
router.get('/summerCollectionImage', productController.summerCollection);
router.get('/winterCollectionImage', productController.winterCollection);
router.get('/winterImage', productController.winterPage);
router.post('/auth/uploadSummerImage/:id', productController.uploadSummerImage);
router.post('/auth/uploadWinterImage/:id', productController.uploadWinterImage);
router.post('/auth/uploadsummerCollection/:id', productController.summerCollectionImage);
router.post('/auth/uploadWinterCollectionData/:id', productController.winterCollectionImage);
module.exports = router;