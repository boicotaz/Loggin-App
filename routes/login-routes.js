const passport = require('passport');
const router = require('express').Router();
// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongodb = require('mongodb').MongoClient;

router.get('/', (req,res) => {
    res.render('login');
});

router.get('/local' ,(req,res) => {
    res.render('login-local');
});


passport.serializeUser((user,done) => {
    console.log('serialize routine');
    done(null,user.username);
});
    


passport.deserializeUser((id,done) => {
    console.log('deserialize routine with key:  ' + `${id}`);

    mongodb.connect(process.env.MONGO_URI ,{useNewUrlParser: true}, (err,db) => {
        let testDB = db.db('test'), users = testDB.collection('users');
        users.findOne({username:id} , function (err,user) {
            done(null,user);
        })  
    })
});
  
  passport.use(new LocalStrategy((username, password, done) => {
      mongodb.connect(process.env.MONGO_URI ,{useNewUrlParser: true}, (err,db) => {
          console.log('Mongo db CONNECTED...');
          let testDB = db.db('test'), users = testDB.collection('users');
          users.findOne({ username: username }, (err, user) => {
              console.log('User ' + username + ' attempted to log in.');
              if (err) return done(err);
              if (!user) return done(null, false);
              if (!password == user.password) { return done(null, false); }
              return done(null, user);
              db.close();
            });
      })
  }));


router.post('/passport',passport.authenticate('local',{failureRedirect:'/login/fail'}),function (req,res) {
    res.redirect('/login/auth');
})

router.get('/fail', function (req,res) {
    res.render('home' ,{loginFailed: true})
})

module.exports = router