const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const localauth = require('../config/passport-setup');


var authCheck = (req,res,next) => {
   console.log('in auth check');
   console.log(req.isAuthenticated() + 'failed?')
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