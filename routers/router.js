var express = require('express');
var router = express.Router();
var pug = require('pug');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;

// @TODO load from DB
var title = 'example'



// define the home page route
router.get('/', function(req, res) {
	console.log("get /");
	res.render('index');
});

// define the home page route
router.get('/login', function(req, res) {
	res.render('login');
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/test',failureRedirect: '/login' }),
  function(req, res) {
    res.send('logged in')
  });
router.get('/test', function(req,res){
	res.send('logged in')
});
module.exports = router;
