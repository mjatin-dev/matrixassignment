const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userschema = Schema({
	username:{type:String},
	useremail:{type:String},
	password:{type: String}
	
});

userschema.methods.hashPassword = (password) => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
userschema.methods.comparePassword = (password,hash) => bcrypt.compare(password,hash);

module.exports = mongoose.model('user',userschema);