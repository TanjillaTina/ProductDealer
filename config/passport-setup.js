const express = require('express');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
var User=require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
      done(err, user);
    });
  });
  


//local strategy

passport.use(new LocalStrategy((username,password,done)=>{
    User.getUserByUsername(username,(err,user)=>{
         if (err) throw err;
         if(!user){
             return done(null,false,{message:'Invalid Username'});
         }
        User.comparePassword(password,user.password,(err,isMatch)=>{
         if (err) throw err;
         if(isMatch){
             return done(null,user);
         }else{
             return done(null,false,{message:'Wrong Password !!'});
         }
        });
    });
 }));
 
 
