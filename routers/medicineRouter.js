var express = require("express")
var path = require("path")
// var app = express()
var app = express.Router()
var cors = require("cors")
app.use(cors())
var bodyparser = require("body-parser")
var fileupload = require("express-fileupload")
app.use(fileupload())
var userController = require("../Controllers/medicineController")
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }))
app.post("/saveMedicine", userController.saveMedicine)
app.post("/updateMedicine", userController.updateMedicine)
app.post("/fetchMedicine", userController.fetchMedicine)
app.post("/fetchCity", userController.fetchCity)
app.post("/fetchCityMedicine/:city", userController.fetchCityMedicine)
app.post("/showAll/:uid", userController.fetchAll)
app.post("/delete", userController.deleteMedicine)
app.post("/fetchProviders/:city/:medicineName", userController.fetchProviders)
app.use(bodyparser.urlencoded({ extended: true }))
module.exports = app