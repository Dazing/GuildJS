var express = require('express');
var router = express.Router();
var pug = require('pug');

// @TODO load from DB
var title = 'example'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// define the home page route
router.get('/', function(req, res) {
	res.render('index', params("index"));
});

// define the home page route
router.get('/login', function(req, res) {
	res.render('login', params("login"));
});


function renderParams (path) {
	switch (path) {
		case "login":
				{
					pageTitle: title,
					boolHeader: false,
					boolFooter: false
				}
			break;
	}

}

module.exports = router;
