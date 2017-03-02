var forum = require('./forum.js');
var user = require('./user.js');

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
         	author: {
         		userid: Schema.Types.Number,
         		name: String
         	}
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

threadSchema.methods.addComment = function(id, comment, user, callback) {

	if(comment){
		thread.findOne({'threadid': id}, function(err, thread){
			//TODO Do not create dummy date once we have real data, just reject
			if(!user || !user.username){
				var username = "John Doe";
				var userid = 123;
			}else{
				var username = user.username;
				var userid = user.userid;
			}
			thread.comments.push({posted: new Date, text: comment, author:{name:username, userid: userid}});
			thread.save(function(err, savedThread){
						if (err) {
							console.log(err);
						}
			});
			callback(err,thread);		
		});
	}else{
		callback('Error: Empty comment');
	}
};

threadSchema.methods.addThread = function(sectionid, name, comment, user) {

	var newThread = new thread();

	newThread.threadid = mongoose.Types.ObjectId();
	newThread.sectionid = sectionid;
	newThread.name = name;
	//TODO Do not create dummy date once we have real data, just reject
	if(!user || !user.username){
		var username = "John Doe";
		var userid = 123;
	}else{		var username = user.username;
		var username = user.userid;
	}
	newThread.comments = {posted: new Date, text: comment, author: {userid: userid, name: username}};
	newThread.save(function(err, savedThread){
		if (err) {
			console.log(err);
		}
	});

};

threadSchema.methods.insertTestData = function() {
	var i = 0;

	forum.findOne(function(err, section){
		if (err) {
			console.log(err);
		}
		else {

			while (i < 3) {
				var newThread = new thread();

				newThread.threadid = mongoose.Types.ObjectId();
				newThread.sectionid = section.sectionid;
				newThread.name = "thread" + i;
				var tmpUser;
				user.schema.methods.findByUsername('test', function(err, foundUser){
					if (err) {
						console.log(err);
					}
					else {
						newThread.comments = {posted: new Date, text: "first comment", author: {userid: foundUser.userid, name: foundUser.username}};
						newThread.save(function(err, savedThread){
							if (err) {
								console.log(err);
							}
						});
					}
				});	

				i++;
			}
		}
	});
};
module.exports = thread;
