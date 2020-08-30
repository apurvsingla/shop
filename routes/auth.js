const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
const passport = require('passport');
// const upload = require('../config/multer');


router.get('/signup', authController.signup);
router.get('/login' ,authController.login);
router.post('/create', authController.create);
router.post('/create-session',passport.authenticate('local', {
    failureRedirect: '/auth/login'
}), authController.createSession);
router.get('/logout', authController.logout);

//upload collection data
router.get('/uploadSummerCollection', authController.upload);
router.post('/uploadSummerCollection/post',authController.postData);
router.get('/uploadWinterCollection', authController.uploadWinter);
router.post('/uploadWinterCollection/post',authController.postWinterData);

module.exports = router;