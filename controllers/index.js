const express = require('express');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
var User=require('../models/user');


var indexPage= (req, res)=> {
    res.render('index');
  };

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


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.getUserById(id, (err, user) => {
      done(err, user);
    });
  });
  


  //login processing
var login= (req, res,next)=> {

    passport.authenticate('local',{
        successRedirect:'/user',
        failureRedirect:'/',
        failureFlash:true
    })(req,res,next);

   
  };

var logout=(req,res,next)=>{
   req.logout();
   req.flash('success_msg','Successfully Logged Out!!');
   res.redirect('/');
};

var ensureAuthenticated=(req, res, next)=>{
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('error_msg', 'You are not authorized to view that page');
      res.redirect('/');
    }
  };

module.exports = {
    indexPage,
    login,
    logout,
    ensureAuthenticated
    };
  
  