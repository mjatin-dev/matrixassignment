var userDoc = require('../models/user.model.js');
module.exports = {
saveuser
};
async function saveuser (data)  {
	console.log(data)
	var user = new userDoc(data);
	return await user.save();
}