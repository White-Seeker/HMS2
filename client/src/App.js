import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import Logout from './pages/Logout'
import AdminDashboard from './pages/AdminDashboard'
import WardenDashboard from './pages/WardenDashboard'
import Notice from './components/Notice'
import NoticeDisplay from './components/NoticeDisplay'
import StudentRegistration from './pages/StudentRegistration'
import FrontPage from './pages/FrontPage'
import StudentLogin from './pages/StudentLogin'
import StudentDetails from './pages/StudentDetails'
import AdminNotice from './components/AdminNotice'
import RoomAllotment from './components/RoomAllotment'
import AllottedStudents from './components/AllottedStudents'

//Route is the conditionally shown component that renders some UI when its path matches the current URL.
// Browserrouter is a router that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.
const App = () => {
	return (
		<div>	
			<BrowserRouter>
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/studentdashboard" exact component={StudentDashboard} />
				<Route path="/logout" exact component={Logout} />
				<Route path="/admindashboard" exact component={AdminDashboard} />
				<Route path="/wardendashboard" exact component={WardenDashboard} />
				<Route path="/notice" exact component={Notice} />
				<Route path="/noticedisplay" exact component={NoticeDisplay} />
				<Route path="/studentregistration" exact component={StudentRegistration} />
				<Route path="/" exact component = {FrontPage} />
				<Route path="/studentlogin" exact component={StudentLogin} />
				<Route path="/studentdetails" exact component={StudentDetails} />
				<Route path="/adminNotice" exact component={AdminNotice} />
				<Route path="/roomallotment" exact component={RoomAllotment} />
				<Route path="/allottedstudents" exact component={AllottedStudents} />
				
			</BrowserRouter>
		</div>
	)
}

export default App
