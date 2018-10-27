const express = require('express');
const router = express.Router();
const passport=require('passport'); 

const indexController=require('../controllers/index');

/* GET home page. */
router.get('/',indexController.indexPage);
router.post('/login',indexController.login);
router.get('/logout',indexController.logout);

module.exports = router;
