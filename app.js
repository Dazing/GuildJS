// Constants
const hostname = '127.0.0.1';
const port = 3000;

// Require (import) libaries.
var express = require('express');
var router = require('./routers/router');
var path = require('path');
var passport_strats = require('./model/passport_strats');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;

// Iniy Express
var app = express();
// Set 'Pug' as the view libary
app.set('view engine', 'pug');
// Set public folder for static files
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use('login', new Strategy(function(email, password, cb){
	console.log("Login Strat Running");

	db.users.findByEmail(email, function(err, user) {
		// If error, return error.
		if (err) { return cb(err); }
		// User does not exist, return false.
		if (!user) { return cb(null, false); }
		// Password incorrect,
		if (user.password != password) { return cb(null, false); }
		return cb(null, user);
    });
})
);

app.get('/', function(req, res) {
	console.log("get /");
	res.render('index');
});

// define the home page route
app.get('/login', function(req, res) {
	res.render('login');
});

app.post('/login',
  passport.authenticate('login', { successRedirect: '/test',failureRedirect: '/login' }),
  function(req, res) {
    res.send('logged in')
  });
app.get('/test', function(req,res){
	res.send('logged in')
});

// ----------------------------------------------------
// Server functionality

app.listen(3000, function () {
	console.log('App listening on port 3000!');
});
