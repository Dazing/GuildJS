var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../model/config.json');

var userSchema = new Schema({
	userid: {
		type: Schema.Types.Number,
		required: true,
		unique: true
	},
	usertype: {
		type: String,
	},
	username: {
		type: String,
		unique: true
	},
    main: {
		name: {type: String},
		server: {type: String}
	}

},{strict:true});


/*userSchema.pre('save', function (next) {
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
});*/

var user = mongoose.model('user', userSchema);

/*userSchema.methods.comparePassword = function (passArg, passStored, cb) {
console.log("CP - Pass_input: "+passStored);
    bcrypt.compare(passArg, passStored, function (err, isMatch) {
		console.log("CP - Pass_input: "+passArg);
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};*/

userSchema.methods.findById = function(id, callback) {
	user.findOne({'userid': id}, function(err, user){
		callback(err,user);
	});
};

userSchema.methods.findOrCreate = function (userid, refreshToken) {
	user.update(
		{ userid: userid },
		{
			$setOnInsert: { userid: userid, refreshToken: refreshToken  }
		},
		{ upsert: true }
	, function(err, result){
		console.log(result);
	})
}

userSchema.methods.updateUser = function (inputUser, callback) {
	console.log("inputUser: "+JSON.stringify(inputUser));
	user.update(
		{ userid: inputUser.id },
		{
			$set: {usertype: inputUser.usertype, username: inputUser.username, main: {server: inputUser.main.server, name: inputUser.main.name }  }
		},
		{}
		, function (err, result) {
			callback(err, result);
		}
	)
}


/* ############################### */
/* TODO LEGACY or DEVELOPMENT CODE */
/* ############################### */



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



userSchema.methods.findByUsername = function(username, callback) {
	console.log("Findbyusername");
	user.findOne({'username': username}, function(err, user){
		callback(err,user);
		if (err) {
			return false;
		} else {
			return user;
		}
	});
};

userSchema.methods.userExists = function(username, callback) {
	console.log("Running userExists: username (input):"+username);
	var res;
	user.findOne({'username': username}, function(err, user){
		if (err) {
			callback(false);
		}
		else if (user) {
			callback(true);
		}
		else {
			callback(false);
		}
	});
	return res;
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


userSchema.methods.insertTestData = function() {
	var i = 0;
	var username = 0;
	var password = 0;

	while (i < 1) {
		var newUser = new user();

		newUser.userid = mongoose.Types.ObjectId();
		newUser.username = "u"+username.toString();
		newUser.name = "n"+username.toString();
		newUser.password = "p"+password.toString();

		user.schema.methods.userExists(newUser.username, function(userExists){
			if (!userExists) {
				newUser.save(function(err, savedUser){
					if (err) {
						console.log(err);
					}
					else {
						console.log(savedUser);
					}
				});
			}
		});

		username++;
		password++;
		i++;
	}
};



module.exports = user;
