var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
    email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
},{strict:true});

var users = mongoose.model('Users', userSchema);
var user = mongoose.model('User', userSchema);

module.exports.findById = function(id, callback) {
	users.findOne({'_id': id}, function(err, user){
		callback(err,user);
	});
}

module.exports.findByEmail = function(email, callback) {
	console.log("Findbyemail");
	users.findOne({'email': id}, function(err, user){
		callback(err,user);
	});
}

module.exports.insertUser = function(name, email, password, callback) {
	var newUser = new user();

	newUser.userid = mongoose.Types.ObjectId();
	newUser.name = name;
	newUser.email = email;
	newUser.password = password;

	users.save(function(err, savedUser){
		if (err) {
			console.log(err);
		}
		else {
			console.log(savedUser);
		}
	});
}
