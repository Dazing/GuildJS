var express = require('express');
var router = express.Router();
var pug = require('pug');

var passport = require('passport');

var jwt = require('jwt-simple');
var config = require('../model/config.json');

var user = require('../model/user.js');
var passportStrats = require('../model/passport_strats');
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
		user.schema.methods.userLogin(req.body.username, req.body.password).then(function(result){
			console.log("token: "+JSON.stringify(result.token));
			res.send(JSON.stringify(result.token));
		}, function (err) {
			console.log("THen Error: "+err);
			res.json(err)
		});
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


module.exports = router;
