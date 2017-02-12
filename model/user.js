var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var JwtStrategy = require('passport-jwt').Strategy;
var config = require('../model/config.json');

mongoose.connect('mongodb://localhost/guildjs');

var userSchema = new Schema({
	userid: {
		type: Schema.Types.ObjectId,
		required: true,
		unique: true
	},
    name: {
		type: String,
		required: true,
	},
    username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
},{strict:true});


userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(8, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

var user = mongoose.model('user', userSchema);

userSchema.methods.comparePassword = function (passArg, passStored, cb) {
console.log("CP - Pass_input: "+passStored);
    bcrypt.compare(passArg, passStored, function (err, isMatch) {
		console.log("CP - Pass_input: "+passArg);
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

userSchema.methods.userLogin = function(username, password){
	return new Promise(function(resolve, reject) {
		user.findOne({
			username: username
		}, function(err, tmpUser) {
			console.log("Err: "+err+", tmpUser: "+tmpUser);

			if (err) throw err;

			if (!tmpUser) {
				reject({success: false, msg: 'Authentication failed. User not found.'});
			} else {
				// check if password matches
				user.schema.methods.comparePassword(password, tmpUser.password, function (err, isMatch) {
					if (isMatch && !err) {
						// if user is found and password is right create a token
						var token = jwt.encode(tmpUser, config.secret);
						// return the information including token as JSON
						console.log(token);
						resolve({success: true, token: 'JWT ' + token});
					} else {
						reject({success: false, msg: 'Authentication failed. Wrong password.'});
					}
				});
			}
		});
	});
};

userSchema.methods.findById = function(id, callback) {
	user.findOne({'_id': id}, function(err, user){
		callback(err,user);
	});
};

userSchema.methods.findByUsername = function(username, callback) {
	console.log("Findbyusername");
	user.findOne({'username': id}, function(err, user){
		callback(err,user);
		if (err) {
			return false;
		} else {
			return user;
		}
	});
};

userSchema.methods.userExists = function(username, callback) {
	user.findOne({'username': username}, function(err, user){
		if (err) {
			return false;
		}
		else if (user) {
			return true;
		}
		else {
			return false;
		}
	});
};

userSchema.methods.insertUser = function(username, password) {
	var userExists = user.schema.methods.userExists(username);

	if (userExists) {
		throw new Error('User already exists.');
	}

	var newUser = new user();

	newUser.userid = mongoose.Types.ObjectId();
	newUser.username = username;
	newUser.name ="olle";
	newUser.password = password;

	newUser.save(function(err, savedUser){
		if (err) {
			console.log(err);
		}
		else {
			console.log(savedUser);
		}
	});
};



module.exports = user;
