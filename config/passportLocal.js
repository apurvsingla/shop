const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: "email"
    },
    function(email, password, done) {
      User.findOne({ email: email }, async function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        let con = await bcrypt.compare(password, user.password);
        if(con){ return done(null, user);}else{return done(null,false)}
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id); 
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
            console.log('Error in finding User --> passport');
            return done(err);
        }
        return done(null, user);
    });
});


passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/auth/login')
}


passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}




module.exports = passport;
