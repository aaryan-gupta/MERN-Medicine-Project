import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Button, Card, Col, Container, Form } from "react-bootstrap"
function MedicineFinder() {
	var [cityJsonAry, fillcityJsonAry] = useState([])
	var [medicineAry, fillMedicineAry] = useState([])
	var [providersObj, fillProvidersObj] = useState([])
	useEffect(async () => {
		var url = "http://localhost:8080/medicine/fetchCity"
		var response = await Axios.post(url)
		await fillcityJsonAry(response.data)
	}, [])
	var [cityObj, setCityObj] = useState({
		city: "",
		medicineName: ""
	})
	var doUpdate = (e) => {
		var { name, value } = e.target
		setCityObj({ ...cityObj, [name]: value })
	}
	var selectCity = async (e) => {
		doUpdate(e)
		var url = "http://localhost:8080/medicine/fetchCityMedicine/" + e.target.value
		var response = await Axios.post(url)
		fillMedicineAry(response.data)
	}
	var doFetchCards = async () => {
		var url = "http://localhost:8080/medicine/fetchProviders/" + cityObj.city + "/" + cityObj.medicineName
		var response = await Axios.post(url)
		fillProvidersObj(response.data)
	}
	var picture;
	return (
		<div>
			<center>
				<Container>
					<Form>
						<Form.Row>
							<Form.Group as={Col} controlId="formGridCity">
								<Form.Label><b>City</b></Form.Label>
								<Form.Control as="select" id="city" onChange={selectCity} value={cityObj.city} name="city">
									<option disabled></option>
									{cityJsonAry.map((o) => { return <option value={o}>{o}</option> })}
								</Form.Control>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridMedicine">
								<Form.Label><b>Medicine</b></Form.Label>
								<Form.Control as="select" value={cityObj.medicineName} name="medicineName" onChange={doUpdate}>
									<option></option>
									{medicineAry.map((o) => { return <option value={o}>{o}</option> })}
								</Form.Control>
							</Form.Group>
						</Form.Row>
					</Form>
					<Button className="m-3" onClick={doFetchCards}>Search Providers</Button>
					<Row>
						{providersObj.map(obj => {
							return (
								<Col md={4}>
									<Card className="m-5" style={{ width: '18rem', border: '2px solid black' }}>
										<Card.Img variant="top" src="" />
										<Card.Body>
											<Card.Title>Card Title</Card.Title>
											<Card.Text>
												<table cellPadding="10" cellSpacing="10">
													<tr>
														<th>Medicine</th>
														<td>{obj.medicineName}</td>
													</tr>
													<tr>
														<th>Company</th>
														<td>{obj.companyName}</td>
													</tr>
													<tr>
														<th>Expiry Date</th>
														<td>{obj.expiryDate}</td>
													</tr>
													<tr>
														<th>Email ID</th>
														<td>{obj.uid}</td>
													</tr>
													<tr>
														<td colSpan="2">
															<noscript>{picture = "/Uploads/" + obj.pic}</noscript>
															<img src={picture} alt="" style={{ width: "100%" }} />
														</td>
													</tr>
												</table>
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
							)
						})}
					</Row>
				</Container>
			</center>
		</div>
	)
}

export default MedicineFinder