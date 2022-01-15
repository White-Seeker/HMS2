import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import RoomAllotment from '../components/RoomAllotment'
import AllottedStudents from '../components/AllottedStudents'
import Notice from '../components/Notice'
import AdminNotice from '../components/AdminNotice'
import Header from '../components/Header.js'

const WardenDashboard = () =>{
    const history = useHistory();//history instance a react hook
    const logout=()=>{
        window.localStorage.clear();//to clear the localstorage of the user, so when 
        //a user logsout it's login local storage is cleared
        window.location.href='/login'
    }

    const allotRoom=()=>{
        window.location.href='/RoomAllotment'
    }

    const allotmentStatus=()=>{
        window.location.href='/AllottedStudents'
    }

    const uploadNotice=()=>{
        window.location.href='/notice'
    }

    const deleteNotice=()=>{
        window.location.href='/adminnotice'
    }

    useEffect(() => { //useEffect react hook to tell React that 
        //components need to do something on render
        const token = localStorage.getItem('token');
        if(!token) {
            const user = jwt.decode(token) // for authentication
            history.push('/login'); //if authentication fails load the login page
        }
      })

    return (
        <div>
            <Header/>
            <h1>Warden Dashboard</h1>
            <button class="btn btn-dark btn-lg" onClick={allotRoom}>Allot Room</button><br></br>
            <button class="btn btn-light btn-lg" onClick={allotmentStatus}>View Allotment Status</button><br></br>
            <button class="btn btn-dark btn-lg" onClick={uploadNotice}>Upload Notice</button><br></br>
            <button class="btn btn-light btn-lg" onClick={deleteNotice}>Delete Notice</button><br></br> 
            <br></br>
            <button class="btn btn-dark" onClick={logout}>Logout</button>
        </div>
    )
}

export default WardenDashboard