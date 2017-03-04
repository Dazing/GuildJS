var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var applicationSchema = new Schema({
	character: {
		name: {
			type: String,
			required: true
		},
		server: {
			type: String,
			required: true
		}
	},
	btag: {
		type: String,
		required: true
	},
	name: 			{ type: String },
	age: 			{ type: Schema.Types.Number },
	mainspec: 		{ type: String, required: true },
	offspec: 		{ type: String, required: true },
	experience: 	{ type: String, required: true },
	history: 		{ type: String, required: true },
	mainspec: 		{ type: String, required: true },
	expectations: 	{ type: String, required: true },
	uiurl: 			{ type: String, required: true },
	logs: 			{ type: String, required: true },
	learning: 		{ type: String, required: true },
	swpoints: 		{ type: String, required: true },
	improve: 		{ type: String, required: true },
	attendance: 	{ type: String, required: true },
	future: 		{ type: String, required: true },
	voicecom: 		{ type: String, required: true },
	discovery: 		{ type: String, required: true },
	other: 			{ type: String }
});

var application = mongoose.model('application', applicationSchema);

applicationSchema.methods.insertApplication = function(application, callback) {
	var userExists = user.schema.methods.userExists(username);

	var newApp = new application();

	newApp.character.name = application.name;
	newApp.character.server = application.server;
	newApp.btag = application.btag;
	newApp.age = application.age;
	newApp.mainspec = 

	newApp.save(function(err, savedUser){
		if (err) {
			console.log(err);
		}
		else {
			console.log(savedUser);
		}
	});
};

module.exports = application;
