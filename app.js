const express = require('express');
const app = express();
const mongodb = require('mongodb');
require('dotenv').config();
const server= require('http').createServer(app);
app.set('view engine' , 'pug');

mongodb.connect(process.env.MONGO_URI ,{useNewUrlParser: true}, () => {
    console.log('Mongo db CONNECTED...');

    //set up static files under public folder
    app.use('/public', express.static(__dirname + '/public'));
    
    // Create home Route
    app.get('/',(req,res) => {
        res.render('home')
    });

    server.listen(process.env.PORT || 4000,'192.168.1.8', () => {
        console.log( `app is now listening to port ${process.env.PORT || 4000}`);
    })
})