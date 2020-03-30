const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const colorschema = Schema({
	
		productname:{type:String},
		color:{type:Array},
		productBy:{type: Schema.Types.ObjectId,ref:'users'},
		createdOn:{type: Date,default: Date.now}
	
});

module.exports = mongoose.model('color',colorschema);