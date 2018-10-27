var express = require('express');
var User=require('../models/user');


var registerPage= (req, res)=> {
    errors='';
    res.render('register',{errors:errors});
  };
  

var registerPost= (req, res,next)=> {
    //res.render('register');
     var name=req.body.name;
     var username=req.body.username;
     var email=req.body.email;
     var password=req.body.password;
     var password2=req.body.password2;


     
     req.checkBody('name','Name Field is Required').notEmpty();
     req.checkBody('username','User Name Field is Required').notEmpty();
     req.checkBody('email','Name Field is Required').isEmail();
     req.checkBody('password','Password Field is Required').notEmpty();
     req.checkBody('password2','Passwords do not match').equals(req.body.password);


    let errors=req.validationErrors();

    if(errors){
        res.render('register',{errors:errors});
    }else{
        const newUser = new User({
            name: name,
            username: username,
            email: email,
            password: password
          });
      
          User.registerUser(newUser, (err, user) => {
            if(err) {
                //throw err;
                req.flash('error_msg', 'Filed To register!! Try Again');
                res.redirect('/register');
            }
            else{
            req.flash('success_msg', 'You are registered and can log in');
            res.redirect('/');
        }
          });
    }
    




  };
  
module.exports = {
    registerPage,
    registerPost
    };
  
  