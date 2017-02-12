var express = require('express');
var router = express.Router();
var pug = require('pug');

var passport = require('passport');

var user = require('../model/user.js');
//var users = require('../model/user.js');




// define the home page route
router.get('/', function(req, res, next) {
	console.log("get /");
	res.render('index');
});

// define the home page route
router.get('/login', function(req, res, next) {
	res.render('login');
});

router.post('/login', function(req, res, next) {
	try {
		var token = user.schema.methods.userLogin(req.body.username);
		res.json(token);
	} catch (e) {
		res.json({error: e.message});
	}

});

router.post('/register', function(req, res, next) {
	if (!req.body.username || !req.body.password) {
		res.json({success: false, msg: 'Please provide username and password.'});
	} else {
		try {
			user.schema.methods.insertUser(req.body.username,req.body.password);
			res.redirect('/');
		} catch (e) {
			res.json({error: e.message});
		}
	}
});


module.exports = router;
