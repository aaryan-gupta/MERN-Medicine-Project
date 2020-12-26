var mongoose = require("mongoose")
var dbConfig = require("./Configuration")
var dbCon = mongoose.connect(dbConfig).then(() => {
	console.log("Connected")
}).catch(err => {
	console.log(err)
})
module.exports = dbCon