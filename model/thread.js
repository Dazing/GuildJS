var forum = require('./forum.js');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var threadSchema = new Schema({
	sectionid: {
		type: Schema.Types.ObjectId,
		required: true,
		unique: false
	},
	threadid: {
		type: Schema.Types.ObjectId,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
	}
});

var thread = mongoose.model('thread', threadSchema);

threadSchema.methods.findBySectionId = function(id, callback) {
	thread.find({'sectionid': id}, function(err, threads){
		callback(err,threads);
	});
};


threadSchema.methods.insertTestData = function() {
	var i = 0;

	forum.findOne(function(err, section){
		if (err) {
			console.log(err);
		}
		else {
			console.log("SEEEECTION!!!! ------------------" + section.sectionid);


			while (i < 3) {
				var newThread = new thread();

				newThread.threadid = mongoose.Types.ObjectId();
				newThread.sectionid = section.sectionid;
				newThread.name = "thread" + i;


				newThread.save(function(err, savedThread){
					if (err) {
						console.log(err);
					}
					else {
						console.log(savedThread);
					}
				});
				i++;
			}
		}
	});
};
module.exports = thread;
