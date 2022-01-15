import React from "react";
import Header from "../components/Header"
// import '../index.css'


function FrontPage(){
    const registrationPage = () =>{
		window.location.href='/register'
	}

	const loginPage = () =>{
		window.location.href='/login'
	}

	const studentRegistration = () =>{
		window.location.href='/studentregistration'
	}

	const studentLogin = () =>{
		window.location.href='/studentlogin'
	}

    return(
        <div>
		<Header />
            <h1>Welcome!</h1>
			<button class="btn btn-dark" onClick={registrationPage}>Staff Register</button><br></br>
			<button class="btn btn-light" onClick={studentRegistration}>Student Register</button><br></br>
			<button class="btn btn-dark" onClick={loginPage}>Staff Login</button><br></br>
			<button class="btn btn-light" onClick={studentLogin}>Student Login</button><br></br>
        </div>

    )
}

export default FrontPage