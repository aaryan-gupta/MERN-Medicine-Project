import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './App'
import AvailMedicine from './AvailMedicine'
import Dashboard from './Dashboard'
import MedicineFinder from './MedicineFinder'
import NavBar from './NavBar'
import UserDashboard from './UserDashboard'

function Routers() {
	return (
		<div>
			<NavBar />
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/UserDashboard/:uid" component={UserDashboard} />
				<Route path="/AvailMedicine/:uid" component={AvailMedicine} />
				<Route path="/MedicineFinder/:uid" component={MedicineFinder} />
				<Route path="/dashboard/:uid" component={Dashboard} />
			</Switch>
		</div>
	)
}

export default Routers
