let auth = require('../controllers/auth.controller.js');
let express = require('express');
let router = express.Router();
let passport = require('passport');



	//CHECK ATUTHENTICATE USER

	router.post('/login',passport.authenticate('local',{
		successRedirect:'/profile',
		failureRedirect:'/login',
		failureFlash:true

	}));

	//SINGUP FORM
	router.post('/signup',auth.signup);

	module.exports = router;
