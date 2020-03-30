let express = require('express');
let router = express.Router();


let search = require('../controllers/search.controller.js');

	//Check Key in headers.
	router.get('/',search.checkkey,search.index)

	//API FOR SEARCH COLOR
    router.get('/search',search.colorsearch);

	module.exports = router;