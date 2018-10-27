var express = require('express');



var profilePage= (req, res)=> {
    errors='';
    res.render('user');
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
    profilePage,
    ensureAuthenticated
    };
  