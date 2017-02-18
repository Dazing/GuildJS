var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var user = require('../model/user');
var config = require('../model/config.json');


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

passport.use(new GoogleStrategy({
	clientID: config.googleId,
	clientSecret: config.googleId,
	callbackURL: "http://localhost:3000/auth/google/callback",
	passReqToCallback   : true
},
function(accessToken, refreshToken, profile, done) {
	console.log("Running google strat");
	process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
}
));
