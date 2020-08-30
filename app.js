const express = require('express');
const logger = require('morgan');
require('dotenv').config();
const port = process.env.PORT;
const ejs = require('ejs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const db = require('./config/mongoose');
//passport
const passport = require('passport');
const passportLocal = require('./config/passportLocal');
const app = express();

app.use(logger('dev'));
//cookie
app.use(cookieParser());
//form and josn data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('./assets'));

//ejs
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(expressLayouts);


//session
app.use(session({
    name: "shopping",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        ttl: 1*60*60,
        autoRemove: 'disabled'
    }),
    function (err) { 
        return console.log(err || 'connect-mongo setup working')
     }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(function(req, res, next) {
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    next();
})

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if(err){
        return console.log(`Error in running the server on port ${port}`);
    }
    return console.log(`Server running on port ${port}`);
})