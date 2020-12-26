

import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import { Button, Col, Container, Form, Spinner } from "react-bootstrap"
import "./index.css"
import { useParams } from 'react-router-dom'
function UserDashboard() {
	var [loading, setLoading] = useState(false)
	var [userProfile, setUserProfile] = useState({
		uid: "",
		name: "",
		mobile: "",
		address: "",
		city: "",
		state: "",
		pincode: "",
		myFile: null
	})
	var doUpdate = (e) => {
		var { name, value } = e.target;
		setUserProfile({ ...userProfile, [name]: value, })
	}
	var doSaveProfile = async () => {
		var url = "http://localhost:8080/user/saveProfile";
		var formData = new FormData()
		for (var x in userProfile) formData.append(x, userProfile[x])
		var response = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
		await alert(JSON.stringify(response.data.msg))
	}
	var doUpdateProfile = async () => {
		var url = "http://localhost:8080/user/updateProfile";
		var response = await axios.post(url, userProfile)
		await alert(JSON.stringify(response.data.msg))
	}
	var doFetchProfile = async () => {
		var url = "http://localhost:8080/user/fetchProfile";
		var response = await axios.post(url, userProfile).then(alert("Hello"))
		if (response.data.length != 0) {
			var { uid, name, mobile, address, city, state, pincode, pic } = response.data[0]
			// alert(pic)
			setUserProfile({ "uid": uid, "name": name, "mobile": mobile, "address": address, "city": city, "state": state, "pincode": pincode, "myFile": pic })
			// fileObj = "./Uploads/" + pic;
			fileObj = "/Uploads/" + pic;
			setFileObj(fileObj)
		}
		else alert("NO DATA FOUND")
	}
	var [fileObj, setFileObj] = useState("../pics/download.png")
	var onPicChange = (e) => {
		setUserProfile({ ...userProfile, ["myFile"]: e.target.files[0] })
		setFileObj(URL.createObjectURL(e.target.files[0]))
		// alert(URL.createObjectURL(e.target.files[0]))
	}
	var { uid } = useParams()
	useEffect(async () => {
		// alert(uid)
		setTimeout(async () => {
			userProfile.uid = uid
			setUserProfile({ ...userProfile, ["uid"]: uid })
			setLoading(true)
			// alert(userProfile.uid)
			// console.log(userProfile.uid)
			// await doUpdate()
			await doFetchProfile()
		}, 3000);
		/* userProfile.uid = uid
		setUserProfile({ ...userProfile, ["uid"]: uid })
		setLoading(true)
		// alert(userProfile.uid)
		// console.log(userProfile.uid)
		// await doUpdate()
		await doFetchProfile() */
	}, [])
	return (
		<Container>
			{loading ? (
				<Form className="mt-5">
					<Form.Row>
						<Form.Group as={Col} controlId="formGridEmail" className="mt-5">
							<Form.Label><b>Email</b></Form.Label>
							<Form.Control className="input" type="email" placeholder="Enter email" name="uid" onChange={doUpdate} value={userProfile.uid} readOnly />
							{/* <Form.Control className="input" type="email" placeholder="Enter email" name="uid" onChange={doUpdate} value={uid} /> */}
						</Form.Group>
						<Form.Group as={Col} controlId="formGridName" className="mt-5">
							<Form.Label><b>Name</b></Form.Label>
							<Form.Control className="input" type="text" placeholder="Name" name="name" onChange={doUpdate} value={userProfile.name} />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridMobile" className="mt-5">
							<Form.Label><b>Mobile Number</b></Form.Label>
							<Form.Control className="input" type="test" placeholder="Mobile Number" name="mobile" onChange={doUpdate} value={userProfile.mobile} />
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridAddress" className="mt-5">
							<Form.Label><b>Address</b></Form.Label>
							<Form.Control className="input" placeholder="1234 Main St, Apartment, studio, or floor" name="address" onChange={doUpdate} value={userProfile.address} />
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridCity" className="mt-5">
							<Form.Label><b>City</b></Form.Label>
							<Form.Control className="input" placeholder="City" name="city" onChange={doUpdate} value={userProfile.city} />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridState" className="mt-5">
							<Form.Label><b>State</b></Form.Label>
							<Form.Control className="input" placeholder="State" name="state" onChange={doUpdate} value={userProfile.state} />
						</Form.Group>
						<Form.Group as={Col} controlId="formGridZip" className="mt-5">
							<Form.Label><b>Pincode</b></Form.Label>
							<Form.Control className="input" placeholder="Pincode" name="pincode" onChange={doUpdate} value={userProfile.pincode} />
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} controlId="formGridPic" className="mt-5">
							<Form.Label><b>ID Proof</b></Form.Label>
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
						<Button variant="primary" className="m-3" type="button" onClick={doSaveProfile}>SAVE</Button>
						<Button variant="primary" className="m-3" type="button" onClick={doUpdateProfile}>UPDATE</Button>
						<Button variant="primary" className="m-3" type="button" onClick={doFetchProfile}>FETCH RECORD</Button>
						{/* </Form.Group> */}
						{/* </Form.Row> */}
					</center>
				</Form>
				/* <center><p>{JSON.stringify(userProfile)}</p></center> */
			) : (
					<center>
						<Spinner animation="border" role="status">
							<span className="sr-only">Loading...</span>
						</Spinner>
					</center>
				)
			}

		</Container>

	)
}
export default UserDashboard