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
	},
	comments: [{ 
			posted: {type: Date},
         	text: {type: String},
        }]
});

var thread = mongoose.model('thread', threadSchema);

threadSchema.methods.findBySectionId = function(id, callback) {
	thread.find({'sectionid': id}, function(err, threads){
		callback(err,threads);
	});
};

threadSchema.methods.findById = function(id, callback) {
	thread.findOne({'threadid': id}, function(err, thread){
		callback(err,thread);
	});
};

threadSchema.methods.addComment = function(id, comment, callback) {

	if(comment){
		thread.findOne({'threadid': id}, function(err, thread){
			thread.comments.push({posted: new Date, text: comment});
			thread.save(function(err, savedThread){
						if (err) {
							console.log(err);
						}
						else {
							console.log(savedThread);
						}
			});
			callback(err,thread);		
		});
	}else{
		callback('Error: Empty comment');
	}
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
				newThread.comments = {posted: new Date, text: "first comment"};


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
