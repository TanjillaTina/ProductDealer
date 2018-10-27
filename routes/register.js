var express = require('express');
var router = express.Router();

const RegisterController=require('../controllers/register');

/* GET home page. */
router.get('/', RegisterController.registerPage);


router.post('/', RegisterController.registerPost);
  
module.exports = router;
