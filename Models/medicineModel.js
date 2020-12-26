var mongoose = require("mongoose")
var getMedicineModel = () => {
	var userSchema = new mongoose.Schema({
		uid: String,
		medicineName: String,
		companyName: String,
		expiryDate: String,
		quantity: Number,
		units: String,
		city: String,
		pic: String
	})
	var userModel = mongoose.model("Medicines", userSchema)
	return userModel
}
module.exports = getMedicineModel