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
/*

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

console.log("gId:"+config.googleId+", gS:"+config.googleSecret);
passport.use('google', new GoogleStrategy({
	clientID: "299629131412-oq11vrptfus3uedo92ql4s3bucjh43aj.apps.googleusercontent.com",
	clientSecret: "WZiyd4B4SgCVoNPn570ixH1A",
	callbackURL: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {

	console.log("Victory");
	process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
}));
