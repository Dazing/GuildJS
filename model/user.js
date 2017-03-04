var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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



var user = mongoose.model('user', userSchema);


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
		if (err) {
			console.log(err);
		}
	})
}

userSchema.methods.updateUser = function (inputUser, callback) {
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



userSchema.methods.findByUsername = function(username, callback) {
	user.findOne({'username': username}, function(err, user){
		callback(err,user);
		if (err) {
			return false;
		} else {
			return user;
		}
	});
};


module.exports = user;
