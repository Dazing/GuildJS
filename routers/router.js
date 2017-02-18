var express = require('express');
var router = express.Router();
var pug = require('pug');

var passport = require('passport');
var passportStrats = require('../model/passport_strats');
var config = require('../model/config.json');

var user = require('../model/user.js');
var forum = require('../model/forum.js');
var thread = require('../model/thread.js');
var events = require('../model/events.js');

//var users = require('../model/user.js');




// define the home page route
router.get('/', ensureAuthenticated, function(req, res, next) {
	console.log("get /");
	res.render('index');
});

// define the home page route
router.get('/login', function(req, res, next) {
	res.render('login');
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


router.get('/auth/google/callback',function(req, res) {
    res.json(req);
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

router.get('/calendar', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    user.findOne({
      username: decoded.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.username + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


router.get('/apply', function(req, res){
	res.render('apply');
});

router.post('/apply', function(req, res){
	res.send('POST from apply recived');
});

router.get('/forum', function(req, res){
	forum.find(function(err, sections){
		if (err) {
			console.log(err);
		}
		else {
			// console.log(sections);
			res.render('forum', {sections: sections});
		}
	});
});

router.get('/forum/section/:id', function(req, res){
	forum.schema.methods.findById(req.params.id, function(err, section){
		if (err) {
			console.log(err);
		}
		else {
			var sectionName = section.name;
			thread.schema.methods.findBySectionId(req.params.id, function(err, threads){
				if (err) {
					console.log(err);
				}
				else {
					res.render('section', {sectionName: sectionName, threads: threads});
				}
			});

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

router.get('/testdata', function(req, res){
	// user.schema.methods.insertTestData();
	// events.schema.methods.insertTestData();
	// forum.schema.methods.insertTestData();
	thread.schema.methods.insertTestData();

	res.redirect('/');

});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = router;
