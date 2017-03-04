var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var applicationSchema = new Schema({
	userid: { type: Schema.Types.Number },
	approved: { type: Boolean, default: false },
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

applicationSchema.methods.insertApplication = function(userid, inputApplication, callback) {
	var newApp = new application();

	newApp.userid = userid;
	newApp.character.name = inputApplication.name;
	newApp.character.server = inputApplication.server;
	newApp.btag = inputApplication.btag;
	newApp.age = inputApplication.age;
	newApp.mainspec = inputApplication.mainspec;
	newApp.offspec = inputApplication.offspec;
	newApp.experience = inputApplication.experience;
	newApp.history = inputApplication.history;
	newApp.expectations = inputApplication.expectations;
	newApp.uiurl = inputApplication.ui_img_url;
	newApp.logs = inputApplication.logs;
	newApp.learning = inputApplication.learning;
	newApp.swpoints = inputApplication.swpoints;
	newApp.improve = inputApplication.improve;
	newApp.attendance = inputApplication.attendance;
	newApp.future = inputApplication.future;
	newApp.voicecom = inputApplication.voicecom;
	newApp.discovery = inputApplication.discovery;
	newApp.other = inputApplication.other;

	newApp.save(function(err, savedApp){
		callback(err,savedApp);
	});
};

module.exports = application;
