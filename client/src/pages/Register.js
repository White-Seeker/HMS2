import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../components/Header'

function Register() {
	const history = useHistory()

	const [name, setName] = useState('') //the first value is current state and second value is function used to update our state
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

  const login=()=>{
    window.location.href='/login';
  }

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
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
			<h1>Register</h1>
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
				<input class="btn btn-dark input-control" type="submit" value="Register" />
			</form>
      <button class="btn btn-light" onClick={login}>Login</button>
		</div>
	)
}

export default Register
