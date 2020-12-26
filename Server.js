const express = require("express")
var cors = require("cors")
var bodyparser = require("body-parser")
var userRouter = require("./routers/userRouter")
var medicineRouter = require("./routers/medicineRouter")
var mongoose = require("mongoose")
var session = require("express-session")
var app = express()
const dbConfig = "mongodb://localhost:27017/nov2020"
app.use(cors())
app.use(express.static("public"))
// app.use(express.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(session({
	secret: "kuch-bhi",
	// something that is not or must not be known by other people
	resave: true,
	saveUninitialized: true
}))
app.use(bodyparser.urlencoded({ extended: true }))
app.use("/user", userRouter)
app.use("/medicine", medicineRouter)
app.listen(8080)
mongoose.set('useCreateIndex', true);
var dbCon = mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log("Connected")
}).catch(err => {
	console.log(err)
})