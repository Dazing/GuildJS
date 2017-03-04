var express = require('express');
var router = express.Router();
var pug = require('pug');

var passport = require('passport');
var passportStrats = require('../model/passport_strats');
var config = require('../model/config.json');

var user = require('../model/user.js');
var forum = require('../model/forum.js');
var thread = require('../model/thread.js');
var application = require('../model/application.js');

//var users = require('../model/user.js');




// define the home page route
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/logout', function(req, res, next) {
	req.logout();
	res.redirect('/');
});

// Make user allow our application to get profile information from google
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'], accessType: 'offline' }));

// Response url from google, run passport as middleware
router.get( '/auth/google/callback',
	passport.authenticate( 'google',
		{ failureRedirect: '/login' }),
	function (req, res, next) {
		console.log("req.user: "+JSON.stringify(req.user));
		res.redirect('/');
});


router.get('/calendar', ensureAuthenticated, function(req, res) {
	res.render('calendar');
});

router.get('/apply', function(req, res){
	res.render('apply');
});

router.post('/apply', function(req, res){
	console.log("POST Apply: "+JSON.stringify(req.body));
	var application = req.body;
	res.send('POST from apply recived');
});

router.get('/profile', function(req, res){
	console.log(JSON.stringify(req.user));
	user.schema.methods.findById(req.user.id, function(err, user){

		if (err) {
			res.render('')
		}

		var tmpUser = {main:{}};

		console.log("User (profile mongo): "+JSON.stringify(user));

		if (user.id) 			{ tmpUser.id 			= user.userid };
		if (user.username)		{ tmpUser.username 		= user.username };
		if (user.usertype) 		{ tmpUser.usertype 		= user.usertype };
		if (user.main.name) 	{ tmpUser.main.name 	= user.main.name };
		if (user.main.server)	{ tmpUser.main.server 	= user.main.server };
		if (user.username) 		{ tmpUser.username 		= user.username };


		console.log("TMPUser (profile mongo): "+JSON.stringify(tmpUser));
		res.render('profile', {user: tmpUser});
	});
});

router.post('/profile', function(req, res){
	var tmpUser = {main:{}};

	tmpUser.id = req.user.id;
	if (req.body.username) 	{ tmpUser.username 		= req.body.username };
	if (req.body.usertype) 	{ tmpUser.usertype 		= req.body.usertype };
	if (req.body.name) 		{ tmpUser.main.name 	= req.body.name };
	if (req.body.server) 	{ tmpUser.main.server 	= req.body.server };
	if (req.body.username) 	{ tmpUser.username 		= req.body.username };

	user.schema.methods.updateUser(tmpUser, function(err, user){
		if (err) {

		}

		if (tmpUser.username) 	{ req.user.username 	= tmpUser.username };
		if (tmpUser.usertype) 	{ req.user.usertype 	= tmpUser.usertype };
		if (tmpUser.name) 		{ req.user.main.name 	= tmpUser.name };
		if (tmpUser.server)		{ req.user.main.server 	= tmpUser.server };
		if (tmpUser.username) 	{ req.user.username 	= tmpUser.username };

		console.log("Req.user : "+JSON.stringify(req.user));

		res.redirect('profile');
	})
});
router.get('/user/:id', function(req, res){
	user.schema.methods.findById(req.params.id, function(err, user){
		if (err) {
			console.log(err);
		}else {
			res.render('user', {user: user});
		}
	});
});

router.get('/forum', function(req, res){
	forum.find(function(err, sections){
		if (err) {
			console.log(err);
		}
		else {
			console.log(sections);
			res.render('forum', {sections: sections});
		}
	});
});
router.post('/forum', ensureAuthenticated, function(req, res){
	forum.schema.methods.addSection(req.body.name, req.body.description, function(err, thread){
 		if (err) {
 			console.log(err);
 		}else {
			res.redirect('/forum');
 		}
 	});
});

router.get('/forum/section/:id', function(req, res){
	forum.schema.methods.findById(req.params.id, function(err, section){
		if (err) {
			console.log(err);
		}
		else {
			var section = section;
			thread.schema.methods.findBySectionId(req.params.id, function(err, threads){

				if (err) {
					console.log(err);
				}
				else {
					res.render('section', {section: section, threads: threads});
				}
			});
		}
	});
});
router.get('/forum/section/edit/:id', function(req, res){
	forum.schema.methods.findById(req.params.id, function(err, section){
		if (err) {
			console.log(err);
		}
		else{
			res.render('edit_section', {section: section});
		}
	});
});
router.post('/forum/section/edit/:id', ensureAuthenticated, function(req, res){
	forum.schema.methods.updateSection(req.params.id, req.body.name, req.body.description, function(err, section){
		if (err) {
			console.log(err);
		}else{
			res.redirect('/forum');
		}
	});
});
router.get('/forum/section/delete/:id', ensureAuthenticated, function(req, res){
	forum.schema.methods.deleteSection(req.params.id, function(err, section){
		if (err) {
			console.log(err);
		}else{
			res.redirect('/forum');
		}
	});
});

router.post('/forum/section/:id', ensureAuthenticated, function(req, res){
	thread.schema.methods.addThread(req.params.id, req.body.threadname, req.body.comment, req.user, function(err, thread){
 		if (err) {
 			console.log(err);
 		}else {
			res.redirect('/forum/thread/'+ thread.threadid);
 		}
 	});



});
router.get('/forum/thread/:id', function(req, res){

 	thread.schema.methods.findById(req.params.id, function(err, thread){
 		if (err) {
 			console.log(err);
 		}
 		else {
 			res.render('thread', {thread: thread});
 		}
 	});


 });
router.post('/forum/thread/:id', ensureAuthenticated, function(req, res){
	var comment = req.body.comment;
	var id = req.params.id;
	console.log("id = :   " + id);
 	thread.schema.methods.addComment(id, comment, req.user, function(err, thread){
 		if (err) {
 			console.log(err);
			res.redirect('/forum/thread/'+ id);
 		}else {
			res.redirect('/forum/thread/'+ id);
 		}
 	});

 });

router.get('/testdata', function(req, res){
	// user.schema.methods.insertTestData();
	// events.schema.methods.insertTestData();
	//forum.schema.methods.insertTestData();
	thread.schema.methods.insertTestData();

	res.redirect('/');

});


function ensureAuthenticated(req, res, next) {
	console.log("Running ensAuth, req.isAuth:"+req.isAuthenticated()+" , req.user:"+JSON.stringify(req.user));
	if (req.isAuthenticated()) {
		if (!req.user.username) {
			res.redirect('profile');
		}
		else {
			return next();
		}
	}
	else {
		res.redirect('/auth/google');
	}
}

router.use(function (req, res, next) {
  res.status(404).render('notfound');
});

router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

module.exports = router;
