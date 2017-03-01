var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var user = require('../model/user');
var config = require('../model/config.json');
var bodyParser = require( 'body-parser' );
var cookieParser = require( 'cookie-parser' );
var session = require( 'express-session' );
var RedisStore = require( 'connect-redis' )( session );

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

function minifyProfile (profile) {
	var minProfile = {
		"id": profile.id
	}
	return minProfile;
}

console.log("gId:"+config.googleId+", gS:"+config.googleSecret);
passport.use('google', new GoogleStrategy({
	clientID: "299629131412-oq11vrptfus3uedo92ql4s3bucjh43aj.apps.googleusercontent.com",
	clientSecret: "WZiyd4B4SgCVoNPn570ixH1A",
	callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, params,profile, done) {

	console.log("Params Tokens: "+JSON.stringify(params));
	process.nextTick(function () {

		user.schema.methods.findOrCreate(profile.id,refreshToken);

		profile = minifyProfile(profile);
    	return done(null, profile);
    });
}));



/*
	TODO REMOVE WHEN SATISFIED WITH GOOGLE OAUTH2
//module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    user.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
//};
*/
