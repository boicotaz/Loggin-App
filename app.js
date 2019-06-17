const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient;
require('dotenv').config();
const server = require('http').createServer(app);
const registerRoutes = require('./routes/register-routes');
const loginRoutes = require('./routes/login-routes');
const bodyParser = require('body-parser');


mongodb.connect(process.env.MONGO_URI ,{useNewUrlParser: true}, (err,db) => {
    // console.log('Mongo db CONNECTED...');
    
    //Use body-parser so we can get body arguments on the request
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    //set up static files under public folder
    app.use('/public', express.static(__dirname + '/public'));
    
    //set view engine 
    app.set('view engine' , 'pug');


    // Create home Route
    app.get('/',(req,res) => {
        res.render('home')
    });

    //Set Routes
    app.use('/register' , registerRoutes);
    app.use('/login', loginRoutes);

    
    server.listen(process.env.PORT || 4000,'192.168.1.8', () => {
        console.log( `app is now listening to port ${process.env.PORT || 4000}`);
    })
})