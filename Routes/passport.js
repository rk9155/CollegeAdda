const passport = require("passport");
const googleStrategy = require('passport-google-oauth20').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const express = require('express');
const router = express.Router();
const Users = require('../Models/users');
const keys = require('../config/keys');



passport.serializeUser(( user , done ) => {
    done(null , user.id);
});

passport.deserializeUser((id , done)=>{
    Users.findById(id).then( user =>{
        done(null , user);
    })
});

//-----------------------------GOOGLE STRATEGY-----------------------------------
passport.use(new googleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
} , 
(accessToken , refreshToken , profile ,done)=>{    
    Users.findOne({ sub : profile.id }).then(
        (existingUsers) =>{
            if(existingUsers){
                done(null,existingUsers);
            }
            else{
                new Users(profile._json).save()
                .then(user => done(null,user));
            }
        }
    );
}
));

router.get('/google' , passport.authenticate('google', {
    scope: ['profile' , 'email']
}));

router.get('/google/callback' , passport.authenticate('google') , (req , res )=>{
    res.redirect('/');
});



//---------------------------------------FACEBOOK STRATEGY----------------------------
passport.use(new facebookStrategy({
    clientID: keys.facebookAppID,
    clientSecret: keys.facebookAppSecret,
    callbackURL: '/auth/facebook/callback',
    proxy: true
} , 
(accessToken , refreshToken , profile ,done)=>{
    console.log(profile);    
    Users.findOne({ sub : profile.id }).then(
        (existingUsers) =>{
            if(existingUsers){
                done(null,existingUsers);
            }
            else{
                new Users(profile._json).save()
                .then(user => done(null,user));
            }
        }
    );
}
));

router.get('/facebook' , passport.authenticate('facebook', {
    scope: ['profile' , 'email']
}));

router.get('/facebook/callback' , passport.authenticate('facebook') , (req , res )=>{
    res.redirect('home2');
});

module.exports = router;

