import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header.js'

//name phone address roll registration email password
function StudentRegistration() {
	const history = useHistory()

	const [name, setName] = useState('') //the first value is current state and second value is function used to update our state
	const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [roll, setRoll] = useState('')
    const [registration, setRegistration] = useState('')
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


  const back=()=>{
	  window.location.href='/adminlogin';
  }

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/studentregister', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
                phone,
                address,
                roll,
                registration,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			history.push('/login') // if registration is successfull 
		}
	}

	return (
		<div>
		<Header />
			<h1>Student Registration</h1>
			<p>Create your Profile</p>
			<form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
					class="input-control"
				/>
				<br />
                <input
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					type="number"
					placeholder="Phone Number"
					class="input-control"
				/>
				<br />
                <input
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					type="text"
					placeholder="Address"
					class="input-control"
				/>
				<br />
                <input
					value={roll}
					onChange={(e) => setRoll(e.target.value)}
					type="text"
					placeholder="Roll Number"
					class="input-control"
				/>
				<br />
                <input
					value={registration}
					onChange={(e) => setRegistration(e.target.value)}
					type="text"
					placeholder="Registration Number"
					class="input-control"
				/>
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="E-mail"
					class="input-control"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
					class="input-control"
				/>
				<br />
				<input class="input-control btn btn-dark" type="submit" value="Register" />
			</form>
			<button class="btn btn-light" onClick={back}>Back</button>
		</div>
	)
}

export default StudentRegistration
