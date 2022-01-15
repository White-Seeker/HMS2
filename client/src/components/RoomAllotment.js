import React from "react";
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header.js'


//name phone address roll registration email password
function RoomAllotment() {
	const history = useHistory()
 //the first value is current state and second value is function used to update our state
	const [roll, setRoll] = useState('')
    const [room, setRoom] = useState('')
	const [block, setBlock] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/allotroom', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
                roll,
				room,
				block
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			window.location.reload() // if registration is successfull 
		}
	}
	

	return (
		<div>
		<Header/>
			<h1>Room Allotment</h1>
			<form onSubmit={registerUser}>
                <input
					value={roll}
					onChange={(e) => setRoll(e.target.value)}
					type="number"
					placeholder="Roll Number"
					class="input-control" 
				/>
				<br />
                <input
					value={room}
					onChange={(e) => setRoom(e.target.value)}
					type="number"
					placeholder="Room"
					class="input-control" 
				/>
				<br />
				<input
					value={block}
					onChange={(e) => setBlock(e.target.value)}
					type="text"
					placeholder="Block"
					class="input-control" 
				/>
				<br />
				<input class="input-control btn btn-dark" type="submit" value="Allot"/>
			</form>
		</div>
	)
}

export default RoomAllotment
