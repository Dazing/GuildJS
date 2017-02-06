var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var itemSchema = new Schema({
	itemid: String
});

module.exports = mongoose.model('Items', itemSchema);
