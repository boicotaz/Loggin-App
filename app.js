const express = require('express');
const app = express();
const mongodb = require('mongodb');
require('dotenv').config();
const server= require('http').createServer(app);
app.set('view engine' , 'pug');


mongodb.connect(process.env.MONGO_URI , () => {
    console.log('Mongo db CONNECTED...');
    server.listen(process.env.PORT || 4000,'192.168.1.8', () => {
        console.log( `app is now listening to port ${process.env.PORT || 4000}`);
    })
})