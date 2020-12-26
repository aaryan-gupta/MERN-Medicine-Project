import React, { useState } from 'react'
import axios from "axios"
import { Button, Form, FormControl, Modal, Nav, Navbar } from "react-bootstrap"
function NavBar() {
	const [showSignup, setShowSignup] = useState(false);
	const handleCloseSignup = () => setShowSignup(false);
	const handleShowSignup = () => setShowSignup(true);
	const [showSignin, setShowSignin] = useState(false);
	const handleCloseSignin = () => setShowSignin(false);
	const handleShowSignin = () => setShowSignin(true);
	var [userSignup, setUserSignup] = useState({
		uidup: "", pwdup: "", mobile: ""
	})
	var [userSignin, setUserSignIn] = useState({
		uidin: "", pwdin: ""
	})
	var doUpdateSignup = (e) => {
		var { name, value } = e.target;
		setUserSignup({ ...userSignup, [name]: value, })
	}
	var doUpdateSignin = (e) => {
		var { name, value } = e.target;
		setUserSignIn({ ...userSignin, [name]: value, })
	}
	var doSignup = async (uid) => {
		var url = "http://localhost:8080/user/saveSignup";
		var response = await axios.post(url, userSignup)
		await alert(JSON.stringify(response.data.msg))
		window.location.href = "/UserDashboard/" + uid
	}
	var doSignin = async (uid) => {
		var url = "http://localhost:8080/user/saveSignin";
		var response = await axios.post(url, userSignin)
		await alert(JSON.stringify(response.data))
		await console.log(JSON.stringify(response.data).length)
		if (JSON.stringify(response.data).length == 26) window.location.href = "/dashboard/" + uid;
	}
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/">Navbar</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					{/* <Nav.Link href="/UserDashboard:uid">Profile</Nav.Link>
					<Nav.Link href="/AvailMedicine:uid">Avail Medicine</Nav.Link> */}
					<Nav.Link href="" onClick={handleShowSignup}>Signup</Nav.Link>
					<Nav.Link href="" onClick={handleShowSignin}>Login</Nav.Link>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-info">Search</Button>
				</Form>
			</Navbar>
			<Modal show={showSignup} onHide={handleCloseSignup}>
				<Modal.Header closeButton>
					<Modal.Title>Signup</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formGridEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Enter email" name="uidup" onChange={doUpdateSignup} />
						</Form.Group>
						<Form.Group controlId="formGridPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" name="pwdup" onChange={doUpdateSignup} />
						</Form.Group>
						<Form.Group controlId="formGridMobile">
							<Form.Label>Mobile Number</Form.Label>
							<Form.Control type="test" placeholder="Mobile Number" name="mobile" onChange={doUpdateSignup} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseSignup}>
						Close
					</Button>
					<Button variant="primary" type="button" onClick={() => doSignup(userSignup.uidup)}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showSignin} onHide={handleCloseSignin}>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" name="uidin" onChange={doUpdateSignin} />
							<Form.Text className="text-muted">
								We'll never share your email with anyone else.
						</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" name="pwdin" onChange={doUpdateSignin} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseSignin}>
						Close
					</Button>
					<Button variant="primary" type="button" onClick={() => doSignin(userSignin.uidin)} >
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
export default NavBar