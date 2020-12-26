var mongoose = require("mongoose")
var userSchema = new mongoose.Schema({
	uidup: {
		type: String,
		index: true,
		unique: true
	},
	pwdup: String,
	mobile: String,
	dos: { type: Date, default: Date.now }
})
module.exports = userSchema