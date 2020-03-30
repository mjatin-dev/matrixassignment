var user = require('../models/user.model.js');




exports.login = (req,res) => {
	res.render('login')
}

exports.signup = (req,res) => {
	res.render('signup')
}

exports.profile = (req,res) => {
	
	res.render('profile',{name:req.user.username})
}

exports.logout = (req,res) => {
	req.logOut();
	res.redirect('/login')
}






