var mongoose = require("mongoose")
var getUserProfileModel = () => {
	var userSchema = new mongoose.Schema({
		uid: {
			type: String,
			index: true,
			unique: true
		},
		name: String,
		mobile: String,
		address: String,
		city: String,
		state: String,
		pincode: String,
		pic: String,
		dos: { type: Date, default: Date.now }
	})
	var userModel = mongoose.model("UsersProfile", userSchema)
	return userModel
}
module.exports = getUserProfileModel