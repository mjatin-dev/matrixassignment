let color  = require('../models/color.model.js'),
    user   = require('../models/user.model.js'),
    async  = require('async');

require('dotenv').config();



exports.index = async(req,res) => {
   res.send('Welcome');
}

//**************** API FOR COLOR SEARCH *******************

exports.colorsearch = async(req,res) => {

		var colors  = req.body.color.split(',');
		var size = color.length;
		var color = await color.find({ "color": { "$size" : size, "$all": color } }).populate('users');
		if(color.length == 0) res.send({status:200,message:"Data not found"});
		else res.send({status:200,message:"Data found",data:color});
}


//**************** ASYNC METHOD *******************

exports.find = (req,res) => {
		var colors  = req.body.color.split(',');
		var size = color.length;

		var findData = function (data, callback) {  
		async.waterfall([
		function(next){
		color.find({ "color": { "$size" : size, "$all": colors }}).exec(next);
		},
		function(colordata, next){
		user.find({productBy:colordata.productBy}).exec(function (err, userdata) {
		next(err, colordata, userdata);
		});
		},
		function(colordata, userdata, next){
		/* Post processing data */
		colordata.userdetail = userdata;
		next(null, colordata);
		}
		], (err,data) => {
		if(err) res.send('err');
		else res.send(data)
		});
	};
}

//check key

exports.checkkey = (req,res) => {
	var key = req.headers['key'];
	if(key  == process.env.SCERET_KEY)
	 next();
	else
	 res.send('key not found');

}



