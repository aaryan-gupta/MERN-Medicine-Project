var path = require("path")
var getUserModel = require("../Models/userModel")
var getUserProfileModel = require("../Models/userProfileModel")
var userModel = getUserModel()
var userProfileModel = getUserProfileModel()
// var fileupload = require("express-fileupload")
var express = require("express")
// var bodyparser = require("body-parser")
var cors = require("cors")
var session = require("express-session")
var app = express.Router()
/* app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(fileupload())
app.use(bodyparser.urlencoded({ extended: true })) */
/* app.use(session({
	secret: "kuchbhi",
	resave: true,
	saveUninitialized: true
})) */
var Signup = async (request, response) => {
	await userModel.create(request.body, (err, result) => {
		if (err) {
			response.send(err)
			return
		}
		response.json({ msg: "RECORD SAVED" })
	})
}
var Signin = async (request, response) => {
	var uidup = request.body.uidin
	var userData = await userModel.findOne({ uidup: uidup })
	if (userData) {
		if (request.body.pwdin === userData.pwdup) {
			request.session.activeuser = uidup;
			response.send("Valid User id & password")
		}
		else response.send("invalid password")
	}
	else response.send("INVALID UID")
}
var saveProfile = async (request, response) => {
	if (request.files == null) request.body.pic = "nopic.jpg"
	else {
		request.body.pic = request.files.myFile.name;
		var fullPath = path.join(__dirname, "..", "reactapp", "public", "Uploads", request.body.pic);
		await request.files.myFile.mv(fullPath, (err) => {
			if (err) alert(err.message)
			else console.log("FILE MOVED")
		})
	}
	await userProfileModel.create(request.body, (err, result) => {
		if (err) {
			response.send(err)
			return
		}
		response.json({ msg: "RECORD SAVED" })
	})
}
var updateProfile = async (request, response) => {
	userProfileModel.update({ uid: request.body.uid }, { $set: request.body }).then(result => {
		console.log(result)
		if (result.nModified != 0) response.json({ msg: "RECORD UPDATED" })
		else response.json({ msg: "INVALID UID" })
	})
}
var fetchProfile = async (request, response) => {
	userProfileModel.find({ uid: request.body.uid }).then(result => response.json(result)).catch(msg => response.json({ err: msg }))
}
var logout = async (request, response) => {
	request.session.destroy()
	response.send("Session Destroyed")
	response.redirect("/")
}
module.exports = { Signup, Signin, saveProfile, updateProfile, fetchProfile, logout }