var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
	itemid: String
});

module.exports = mongoose.model('Events', itemSchema);
