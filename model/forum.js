var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var forumSchema = new Schema({
	sectionid: {
		type: Schema.Types.ObjectId,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
	}
});

var forum = mongoose.model('forum', forumSchema);

forumSchema.methods.insertTestData = function() {
	var i = 0;

	while (i < 3) {
		var newSection = new forum();

		newSection.sectionid = mongoose.Types.ObjectId();
		newSection.name = "section" + i;


		newSection.save(function(err, savedSection){
			if (err) {
				console.log(err);
			}
			else {
				console.log(savedSection);
			}
		});
		i++;
	}
};

// userSchema.methods.sectionExists = function(username, callback) {
// 	console.log("Running sectionExists");
// 	var res;
// 	forum.findOne({'username': username}, function(err, user){
// 		if (err) {
// 			callback(false);
// 		}
// 		else if (user) {
// 			callback(true);
// 		}
// 		else {
// 			callback(false);
// 		}
// 	});
// 	return res;
// };

module.exports = forum;
