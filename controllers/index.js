var express = require('express');



var indexPage= (req, res)=> {
    res.render('index');
  };
  
module.exports = {
    indexPage
    };
  
  