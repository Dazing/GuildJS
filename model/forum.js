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
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

var forum = mongoose.model('forum', forumSchema);

forumSchema.methods.findById = function(id, callback) {
	forum.findOne({'sectionid': id}, function(err, section){
		callback(err,section);
	});
};


forumSchema.methods.addSection = function(name, description, callback) {
	var newSection = new forum();

	newSection.sectionid = mongoose.Types.ObjectId();
	newSection.name = name;
	newSection.description = description;

	newSection.save(function(err, savedSection){
		if (err) {
			callback(err);
		}else{
			callback(null,savedSection);
		}
	});
};
forumSchema.methods.updateSection = function(id, name, description, callback) {
	forum.findOne({'sectionid': id}, function(err, section){
		section.name = name;
		section.description = description;

		section.save(function(err, savedSection){
			if (err) {
				callback(err);
			}else{
				callback(null,savedSection);
			}
		});

	});
};

forumSchema.methods.deleteSection = function(id, callback) {
	forum.remove({'sectionid': id}, function(err, section){
		callback(err,section)
	});
};


forumSchema.methods.insertTestData = function() {
	var i = 0;

	while (i < 3) {
		var newSection = new forum();

		newSection.sectionid = mongoose.Types.ObjectId();
		newSection.name = "section" + i;
		newSection.description = "This is an an amazing description i would say";


		newSection.save(function(err, savedSection){
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
};

module.exports = forum;
