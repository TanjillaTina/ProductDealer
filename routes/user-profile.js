var express = require('express');
var router = express.Router();

const ProfileController=require('../controllers/user-profile');

/* GET home page. */
router.get('/',ProfileController.ensureAuthenticated, ProfileController.profilePage);

  
module.exports = router;
