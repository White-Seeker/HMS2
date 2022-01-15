import { useState } from 'react'
import Header from '../components/Header.js'

function App() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    const register=()=>{
        window.location.href='/register'
    }

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
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
		if (email=='admin@gmail.com' && data.user){
			localStorage.setItem('token',data.user)
			window.location.href='/admindashboard'
		}
		else if(email=='warden@gmail.com' && data.user){
			localStorage.setItem('token',data.user)
			window.location.href='/wardendashboard'
		}
		else if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/staffdashboard'
		} 
		else {
			alert('Please check your username and password')
		}
	}

	return (
		<div>
		<Header />
			<h1>Login</h1>
			<p>Sign in to your Profile</p>
			<form  onSubmit={loginUser}>
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
				<input class="btn btn-dark input-control" type="submit" value="Login" />
			</form>
            <button class="btn btn-light" onClick={register}>Register</button>
		</div>
	)
}

export default App
