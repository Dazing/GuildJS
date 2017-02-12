var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var characterSchema = new Schema({
	charid: Schema.Types.ObjectId,
	userid: Schema.Types.ObjectId,
	name: String,
	server: String,
	region: String
});

module.exports = mongoose.model('Characters', characterSchema);
