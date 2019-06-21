const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient;
require('dotenv').config();
const server = require('http').createServer(app);
const registerRoutes = require('./routes/register-routes');
const loginRoutes = require('./routes/login-routes');
const profileRoutes = require('./routes/profile-routes').router;
const authCheck = require('./routes/profile-routes').authCheck;
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const sessionStore= new session.MemoryStore();
const logoutRoutes =  require('./routes/login-routes');
const socket = require('./socket/socket-setup');


mongodb.connect(process.env.MONGO_URI ,{useNewUrlParser: true}, (err,db) => {
    // console.log('Mongo db CONNECTED...');
    
    //Use body-parser so we can get body arguments on the request
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    //set up static files under public folder
    app.use('/public', express.static(__dirname + '/public'));
    
    //set view engine 
    app.set('view engine' , 'pug');

    //set session middle-ware  ,// store: sessionStore,
    app.use(session({secret: process.env.SESSION_SECRET,resave: true,saveUninitialized: true,key: 'express.sid',store:sessionStore}));
       

    //// initiallize passport for authentication
    app.use(passport.initialize());
    app.use(passport.session());

    // Create home Routes
    app.get('/',(req,res) => {
        res.render('home');
    });

    app.get('/logged-in' ,authCheck, (req,res) => {
        res.render( 'home-logged', {username: req.user.username})
    });
    
    //Set Routes
    app.use('/register' , registerRoutes);
    app.use('/login', loginRoutes);
    app.use('/login/auth', profileRoutes);
    app.use('/logout' , logoutRoutes);
    
    server.listen(process.env.PORT || 4000, () => {
        console.log( `app is now listening to port ${process.env.PORT || 4000}`);
    })

    // Socket Handler
    socket(server);
})