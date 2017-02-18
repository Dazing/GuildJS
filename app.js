// Constants
const hostname = '127.0.0.1';
const port = 3000;

// Require (import) libaries.
var express = require('express');
var router = require('./routers/router');
var path = require('path');
var passport_strats = require('./model/passport_strats');
var passport = require('passport');
var https = require('https');

// Iniy Express
var app = express();
// Set 'Pug' as the view libary
app.set('view engine', 'pug');
// Set public folder for static files
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));



app.use(passport.initialize());

app.use('/', router);

// ----------------------------------------------------
// Server functionality

app.listen(3000, function () {
	console.log('App listening on port 3000!');
});
