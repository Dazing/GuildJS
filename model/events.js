var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
	eventid: {
		type: Schema.Types.ObjectId,
		required: true,
		unique: true
	},
	type: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	}
});

var event = mongoose.model('event', eventSchema);

eventSchema.methods.insertTestData = function() {
	var i = 0;
	var date = new Date(2017,2,15,19,45);

	while (i < 50) {
		var newEvent = new event();

		newEvent.eventid = mongoose.Types.ObjectId();
		newEvent.type = "mainraid";
		newEvent.date = date;

		var eventExists = event.schema.methods.eventExists(newEvent.date, newEvent.type, function(eventExists){
			if (!eventExists) {
				newEvent.save(function(err, savedEvent){
					if (err) {
						console.log(err);
					}
					else {
						console.log(savedEvent);
					}
				});
			}
		});




		date.setDate(date.getDate()+3);
		i++;
	}
};

eventSchema.methods.eventExists = function(inputDate, inputType, callback) {
	event.findOne({$and:[{'date': inputDate},{'type': inputType}]}, function(err, event){
		if (err) {
			callback(false);
		}
		else if (event) {
			callback(true);
		}
		else {
			callback(false);
		}
	});
};

module.exports = event;
