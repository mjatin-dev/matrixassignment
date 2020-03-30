var user = require('../models/user.model.js');

exports.login = async (req,res) => {

}

exports.signup = async(req,res) => {

	var body     = req.body,
	    username = body.username,
	    useremail = body.useremail,
	    password = body.password;

	   var findUser = await user.find({useremail:useremail});
	   if(findUser.length != 0) res.status(400).send("USERNAME ALREADY EXISTS");
	   else
	   {
	   	var newUser = new user();
	   	   newUser.username = username;
	   	    newUser.useremail = useremail;
	   	    newUser.password = newUser.hashPassword(password);

	   	    var saveUser = await newUser.save();
	   	    if(saveUser) res.redirect('/login')
	   	    else res.status(400).send("ERROR")
	   }

}




