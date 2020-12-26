var path = require("path")
var getMedicineModel = require("../Models/medicineModel")
var medicineModel = getMedicineModel()
var fileupload = require("express-fileupload")
var express = require("express")
var bodyparser = require("body-parser")
var cors = require("cors")
var app = express.Router()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(fileupload())
app.use(bodyparser.urlencoded({ extended: true }))
var saveMedicine = async (request, response) => {
	if (request.files == null) request.body.pic = "nopic.jpg"
	else {
		request.body.pic = request.files.myFile.name;
		var fullPath = path.join(__dirname, "..", "reactapp", "public", "Uploads", request.body.pic);
		await request.files.myFile.mv(fullPath, (err) => {
			if (err) alert(err.message)
			else console.log("FILE MOVED")
		})
	}
	await medicineModel.create(request.body, (err, result) => {
		if (err) {
			response.send(err)
			return
		}
		response.json({ msg: "RECORD SAVED" })
	})
}
var updateMedicine = async (request, response) => {
	medicineModel.update({ medicineName: request.body.medicineName }, { $set: request.body }).then(result => {
		console.log(result)
		if (result.nModified != 0) response.json({ msg: "RECORD UPDATED" })
		else response.json({ msg: "INVALID UID" })
	})
}
var fetchMedicine = async (request, response) => {
	medicineModel.find({ medicineName: request.body.medicineName }).then(result => response.json(result)).catch(msg => response.json({ err: msg }))
}
var fetchCity = async (request, response) => {

	medicineModel.distinct("city").then(result => response.json(result)).catch(msg => response.json({ err: msg }))
}
var fetchCityMedicine = async (request, response) => {
	var city = request.params.city
	medicineModel.distinct("medicineName", { city: city }).then(result => { response.json(result) }).catch(err => response.json({ errmsg: err }))
}
var fetchAll = async (request, response) => {
	medicineModel.find({ uid: request.params.uid }).then(result => response.json(result)).catch(msg => response.json({ err: msg }))
}
var deleteMedicine = async (request, response) => {
	medicineModel.deleteOne({ _id: request.body.id }).then(result => {
		if (result.deletedCount != 0) response.json({ msg: "DELETED" })
		else response.json({ msg: "INVALID" })
	})
}
var fetchProviders = (request, response) => {
	medicineModel.find({ city: request.params.city, medicineName: request.params.medicineName }).then(result => response.json(result)).catch(err => response.json({ errmsg: err }))
}
module.exports = { saveMedicine, updateMedicine, fetchMedicine, fetchCity, fetchCityMedicine, fetchAll, deleteMedicine, fetchProviders }