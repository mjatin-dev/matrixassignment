let express = require('express');
let router = express.Router();

let users = require('../controllers/user.controller.js');
let passport = require('passport');
let initializePassword = require('../passport.js');


   //USER LOGIN
	router.get('/login',users.login);

	//USER SIGNUP
	router.get('/signup',users.signup);

	router.get('/profile',initializePassword.checkauthenticate,users.profile);
	
	router.delete('/logout',users.logout);

module.exports = router;