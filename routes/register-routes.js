const router = require('express').Router();
const mongodb = require('mongodb').MongoClient; 
require('dotenv').config();

router.get('/' , (req,res) => {
    res.render('register');
} )

router.post('/auth', (req,res) => {

    mongodb.connect(process.env.MONGO_URI ,{useNewUrlParser: true}, (err,db) => {
        console.log('Mongo db CONNECTED...');
        let username = req.body.username, testDB = db.db('test'), users = testDB.collection('users'),password = req.body.password ;
    
        users.findOne({username:username},(err,db_res) => {
            if(db_res == null){

                users.insertOne({username: username, password },(ins_err,ins_res) => {
                    if(ins_err) throw err;
                    else {
                        console.log('1 Doc inserted' + ` ${ins_res}`);
                        db.close();
                        res.render('home' , {registerSuccess: true});
                    }
                })
            }  
            else {

                db.close();
                res.render('home' ,{alreadyExists: true} )
            }
        })
    })

})


module.exports = router;