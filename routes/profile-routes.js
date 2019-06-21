const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const localauth = require('../config/passport-setup');


var authCheck = (req,res,next) => {
   console.log('is user validated??');
   console.log('the answer is : ' + req.isAuthenticated() )
    if (req.isAuthenticated()) {
       return next();
    }
    else {
        res.render('home');
    }
}

router.get('/' , authCheck, (req,res) => {
    res.render( 'profile', {username: req.user.username})
})


module.exports = {router,authCheck}