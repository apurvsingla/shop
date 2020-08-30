const User = require('../models/userSchema');
const {authSchema} = require('../models/validationSchema');
const Upload = require('../models/upload');
const Winter = require('../models/winter');

const asyncPageRender = (name,data) => (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    return res.render(name,{
        title: data
    });
}

const adminAccess = (name,data) => (req,res) => {
    try {
        User.findOne(req.user, function(err,user){
            if(!err && user.isActive === true){
                return res.render(name,{
                    title: data
                });
            }else {
                return res.redirect('back');
            }
        });
    } catch (e) {
        console.log(e);
        return res.redirect('back');
    }
}

module.exports.create = async(req,res,next) => {
    try {
        let userDetails = req.body;
        let checkUser = await User.findOne({email: req.body.email}).lean();
        let auth = authSchema.validate(userDetails);
        console.log(auth)
        if(checkUser){
            console.log('user already found');
            return res.redirect('/auth/login');
        }
        let newUser = await new User(auth.value);
        await newUser.save();
        return res.redirect('/auth/login');
        
    } catch (error) {
        console.log(error)
        res.redirect('back');
    }
};

module.exports.signup = asyncPageRender("signup", "Signup");

module.exports.login = asyncPageRender("login", "Login");

module.exports.createSession = async (req,res) => {
    try {
        const result = await authSchema.validate(req.body);
        const user = await User.findOne({email: req.body.email});
        if(!user){
            console.log("user not regisred");
            return res.redirect('/auth/signup');
        }
        const isMatch = await user.isValidPassword(result.value.password);
        if(!isMatch){
            console.log('password error');
            return res.redirect('back');
        };
        return res.redirect('/');
    } catch (error) {
        console.log('error signing in', error);
        return res.redirect('back');
    }
}

module.exports.logout = (req,res) => {
    req.logout();
    res.redirect('/auth/login');
}

module.exports.upload = adminAccess('uploadPage', "Upload Products");

module.exports.postData = async (req,res) => {
    let upload = new Upload(req.body);
    upload.save();
    console.log(upload)
    return res.redirect('back');
}

module.exports.uploadWinter = adminAccess('uploadWinter', "Winter Products");

module.exports.postWinterData = async (req,res) => {
    let winter = new Winter(req.body);
    winter.save();
    return res.redirect('back');
}