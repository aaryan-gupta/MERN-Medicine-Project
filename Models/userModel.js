var mongoose = require("mongoose")
var getUserModel = () => {
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
	var userModel = mongoose.model("UsersSignup", userSchema)
	return userModel
}
module.exports = getUserModel