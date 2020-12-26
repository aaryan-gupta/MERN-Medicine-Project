import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap"
import "./index.css"
import { useState } from 'react'
import Axios from 'axios'
function Dashboard() {
	const { uid } = useParams()
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		doFetchAll()
	}
	var [jsonary, filljsonary] = useState([{}])
	var [nameObj, setNameObj] = useState({
		id: ""
	})
	var doFetchAll = async () => {
		var url = "http://localhost:8080/medicine/showall/" + uid
		var response = await Axios.post(url)
		filljsonary(response.data)
	}
	var doDelete = async (id) => {
		var url = "http://localhost:8080/medicine/delete"
		// alert(url)
		// await setNameObj({ ...nameObj, ["name"]: id })
		// alert(JSON.stringify(nameObj))
		var response = await Axios.post(url, { "id": id })
		// console.log(JSON.stringify(response))
		await alert(JSON.stringify(response.data.msg))
		await doFetchAll()
	}
	var doLogout = async () => {
		var url = "http://localhost:8080/user/logout"
		var response = await Axios.post(url)
		await alert(response.data)
		window.location.href = "/"
	}
	return (
		<div>
			<center>
				<Container>
					<Row className="mt-5">
						<Col>
							<Card style={{ width: '18rem', border: "2px solid black" }}>
								<Button variant="light" onClick={() => window.location.href = "/UserDashboard/" + uid}>
									<Card.Img variant="top" src="../pics/images.jpeg" />
									<Card.Body>
										<Card.Title>Personal Details</Card.Title>
									</Card.Body>
								</Button>
							</Card>
						</Col>
						<Col>
							<Card style={{ width: '18rem', border: "2px solid black" }}>
								<Button variant="light" onClick={() => window.location.href = "/AvailMedicine/" + uid}>
									<Card.Img variant="top" src="../pics/images.jpeg" />
									<Card.Body>
										<Card.Title>Donate Medicine</Card.Title>
									</Card.Body>
								</Button>
							</Card>
						</Col>
						<Col>
							<Card style={{ width: '18rem', border: "2px solid black" }}>
								<Button variant="light" onClick={() => window.location.href = "/MedicineFinder/" + uid}>
									<Card.Img variant="top" src="../pics/images.jpeg" />
									<Card.Body>
										<Card.Title>Request Medicine</Card.Title>
									</Card.Body>
								</Button>
							</Card>
						</Col>
					</Row>
					<Row className="mt-5">
						<Col>
							<Card style={{ width: '18rem', border: "2px solid black" }}>
								<Button variant="light" onClick={handleShow}>
									<Card.Img variant="top" src="../pics/images.jpeg" />
									<Card.Body>
										<Card.Title>Medicine Manager</Card.Title>
									</Card.Body>
								</Button>
							</Card>
						</Col>
						{/* <Col>
							<Card style={{ width: '18rem', border: "2px solid black" }}>
								<Button variant="light" onClick={() => window.location.href = "/AvailMedicine/" + uid}>
									<Card.Img variant="top" src="../pics/images.jpeg" />
									<Card.Body>
										<Card.Title>Donate Medicine</Card.Title>
									</Card.Body>
								</Button>
							</Card>
						</Col> */}
						<Col>
							<Card style={{ width: '18rem', border: "2px solid black" }}>
								<Button variant="light" onClick={doLogout}>
									<Card.Img variant="top" src="../pics/images.jpeg" />
									<Card.Body>
										<Card.Title>Logout</Card.Title>
									</Card.Body>
								</Button>
							</Card>
						</Col>
					</Row>
					{/* <Button variant="primary" onClick={handleShow}>
						Launch demo modal
					</Button> */}
					<Modal show={show} onHide={handleClose} size="lg">
						<Modal.Header closeButton>
							<Modal.Title>Modal heading</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<center>
								{/* <Button onClick={doFetchAll}>Fetch All</Button> */}
								<table cellPadding="10" cellSpacing="10" border="1">
									<tr>
										<th>S No.</th>
										<th>Medicine Name</th>
										<th>Company Name</th>
										<th>Expiry Date</th>
										<th>Delete</th>
									</tr>
									{jsonary.map((obj, index) => {
										return (
											<tr>
												<td>{index}</td>
												<td>{obj.medicineName}</td>
												<td>{obj.companyName}</td>
												<td>{obj.expiryDate}</td>
												<td>
													<Button name="name" onClick={() => doDelete(obj._id)}>Delete</Button>
												</td>
											</tr>
										)
									})}
								</table>
							</center>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
							<Button variant="primary" onClick={handleClose}>
								Save Changes
							</Button>
						</Modal.Footer>
					</Modal>
				</Container>
			</center>
		</div >
	)
}
export default Dashboard