var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var user = require('../model/user');
var config = require('../model/config.json');

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        user.findById(id, function(err, user) {
            done(err, user);
        });
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
passport.use(new GoogleStrategy({
	clientID: config.googleId,
	clientSecret: config.googleId,
	callbackURL: "/auth/google/callback",
	passReqToCallback   : true
},
function(accessToken, refreshToken, profile, done) {

	console.log("Victory");
}));
