import { useState } from 'react'
import Header from '../components/Header.js'

function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    const register=()=>{
        window.location.href='/studentregistration'
    }

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/studentlogin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()
		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/dashboard'
		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div>
		<Header />
			<h1>Student Login</h1>
			<p>Sign in to your Profile</p>
			<form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
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
				<input class="btn btn-dark input-control" type="submit" value="Login" />
			</form>
            <button class="btn btn-light" onClick={register}>Register</button>
		</div>
	)
}

export default App
