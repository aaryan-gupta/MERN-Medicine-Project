import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Container, Form } from "react-bootstrap"
import "./index.css"
import axios from "axios"
import { useParams } from 'react-router-dom'
function AvailMedicine() {
	var [medicineProfile, setMedicineProfile] = useState({
		uid: "",
		medicineName: "",
		companyName: "",
		expiryDate: "",
		quantity: 0,
		units: "",
		city: "",
		myFile: null
	})
	var doUpdate = (e) => {
		var { name, value } = e.target;
		setMedicineProfile({ ...medicineProfile, [name]: value, })
	}
	var [fileObj, setFileObj] = useState("../pics/download.png")
	var onPicChange = (e) => {
		setMedicineProfile({ ...medicineProfile, ["myFile"]: e.target.files[0] })
		setFileObj(URL.createObjectURL(e.target.files[0]))
	}
	var doSaveMedicine = async () => {
		var url = "http://localhost:8080/medicine/saveMedicine";
		var formData = new FormData()
		for (var x in medicineProfile) formData.append(x, medicineProfile[x])
		var response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
		await alert(JSON.stringify(response.data.msg))
	}
	var doUpdateMedicine = async () => {
		var url = "http://localhost:8080/medicine/updateMedicine"
		var response = await axios.post(url, medicineProfile)
		await alert(JSON.stringify(response.data.msg))
	}
	var doFetchMedicine = async () => {
		var url = "http://localhost:8080/medicine/fetchMedicine";
		var response = await axios.post(url, medicineProfile)
		if (response.data.length == 0) await alert(JSON.stringify(response.data.err))
		var { medicineName, companyName, expiryDate, quantity, units, pic } = response.data[0]
		setMedicineProfile({ "medicineName": medicineName, "companyName": companyName, "expiryDate": expiryDate, "quantity": quantity, "units": units, "myFile": pic })
		fileObj = "/Uploads/" + pic
		setFileObj(fileObj)
	}
	var { uid } = useParams()
	useEffect(() => {
		medicineProfile.uid = uid
		setMedicineProfile({ ...medicineProfile, ["uid"]: uid, })
	}, [])
	return (
		<div>
			<Container>
				<Form className="mt-5">
					<Form.Row>
						<Form.Group as={Col} controlId="formGridEmail" className="mt-5">
							<Form.Label><b>Email</b></Form.Label>
							<Form.Control className="input" type="email" placeholder="Enter email" name="uid" onChange={doUpdate} value={medicineProfile.uid} readOnly />
							{
								// <Form.Control className="input" type="email" placeholder="Enter email" name="uid" onChange={doUpdate} value={uid} />
							}
						</Form.Group>
						<Form.Group as={Col} controlId="formGridMedicineName" className="mt-5">
							<Form.Label><b>Medicine Name</b></Form.Label>
							<Form.Control type="text" name="medicineName" placeholder="Enter Name" onChange="doUpdate" className="input" value={medicineProfile.medicineName} onChange={doUpdate} />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridCompanyName" className="mt-5">
							<Form.Label><b>Company</b></Form.Label>
							<Form.Control type="text" name="companyName" placeholder="Enter Company" onChange="doUpdate" className="input" value={medicineProfile.companyName} onChange={doUpdate} />
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridDate" className="mt-5">
							<Form.Label><b>Expiry Date</b></Form.Label>
							<Form.Control type="date" name="expiryDate" placeholder="Enter Date" onChange="doUpdate" className="input" value={medicineProfile.expiryDate} onChange={doUpdate} />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridQuantity" className="mt-5">
							<Form.Label><b>Quantity</b></Form.Label>
							<Form.Control type="number" name="quantity" placeholder="Enter Quantity" onChange="doUpdate" className="input" value={medicineProfile.quantity} onChange={doUpdate} />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridUnits" className="mt-5">
							<Form.Label><b>Units</b></Form.Label>
							<Form.Control type="text" name="units" placeholder="Tablets / Bottles / Boxes / Injections" onChange="doUpdate" className="input" value={medicineProfile.units} onChange={doUpdate} />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridCity" className="mt-5">
							<Form.Label><b>City</b></Form.Label>
							<Form.Control type="text" name="city" placeholder="Enter City" onChange="doUpdate" className="input" value={medicineProfile.city} onChange={doUpdate} />
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridPic" className="mt-5">
							<Form.Label><b>Medicine Picture</b></Form.Label>
							<div><input type="file" onChange={onPicChange} /></div>
						</Form.Group>
						<Form.Group as={Col} className="mt-5">
							<Form.Label><b>Picture Preview</b></Form.Label>
							<div><img src={fileObj} style={{ width: "50%", border: "2px solid black" }} /></div>
						</Form.Group>
					</Form.Row>
					<center>
						{/* <Form.Row> */}
						{/* <Form.Group as={Col}> */}
						<Button variant="primary" className="m-3" type="button" onClick={doSaveMedicine}>SAVE</Button>
						<Button variant="primary" className="m-3" type="button" onClick={doUpdateMedicine}>UPDATE</Button>
						<Button variant="primary" className="m-3" type="button" onClick={doFetchMedicine}>FETCH RECORD</Button>
						{/* </Form.Group> */}
						{/* </Form.Row> */}
					</center>
				</Form>
			</Container>
		</div>
	)
}

export default AvailMedicine
