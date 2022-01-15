import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header.js'
import noticeCSS from '../notice.module.css';


const StudentDashboard = () => {
	const history = useHistory()

	const notice=()=>{
		window.location.href='/noticedisplay'
	}
	const logout=()=>{
        window.localStorage.clear();
        window.location.href='/studentlogin'
    }

	const [data, setData]= useState([])
	const [phone, setPhone] = useState([])
	const [email, setEmail] = useState([])
	const [address, setAddress] = useState([])
	const [roll, setRoll] = useState([])
	const [registration, setRegistration] = useState([])
    const item=[];

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if (!user) {
				localStorage.removeItem('token')
				history.replace('/login')
			} 
			apiGet();
		}
		else{
			history.push('/studentlogin')
		}
	}, [])

	const apiGet = ()=>{
		const token = localStorage.getItem('token')
		const user = jwt.decode(token) //This contains the values of logged user..
		// console.log it to view
		fetch('http://localhost:1337/api/studentlogin')
        .then((response)=>response.json())
        .then((json)=>{
            for(let i=0;i<json.user.length;i=i+1){
                if(user.email==json.user[i].email){//It compares the value of 
					//logged in user and the fetched data set...
					//the matched email will find the user... 
					//as no two users can have the same email
					setData(json.user[i].name);
					setPhone(json.user[i].phone);
					setEmail(json.user[i].email);
					setAddress(json.user[i].address);
					setRoll(json.user[i].roll);
					setRegistration(json.user[i].registration);
				}
            }
		})
		return {item}
    }


	
	return (
		<div >
			<Header/>
			<h1>Student Dashboard</h1>
			<div class="alert alert-secondary">
			<p><strong>Name:</strong> {data}</p>
			<p><strong>Phone Number:</strong> {phone}</p>
			<p><strong>E-mail:</strong> {email}</p>
			<p><strong>Address:</strong> {address}</p>
			<p><strong>Roll Number:</strong> {roll}</p>
			<p><strong>Registration Number:</strong> {registration}</p>
			</div>
			<button class="btn btn-dark btn-lg btn-block" onClick={notice}>View Notice</button><br></br>
			<br></br>
			<button class="btn btn-dark" onClick={logout}>Logout</button>
		</div>
	)
}

export default StudentDashboard
