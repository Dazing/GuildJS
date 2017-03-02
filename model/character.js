var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var applicationSchema = new Schema({
	character: {
		name: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		}
	},
	btag: {
		type: String,
		required: true
	},
	name: {
		type String,

	}

});

module.exports = mongoose.model('applications', characterSchema);
