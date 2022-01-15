import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import Notice from '../components/Notice'
import AdminNotice from '../components/AdminNotice'
import Header from '../components/Header.js'

const AdminDashboard = () =>{
    const history = useHistory();

    const addStudent=()=>{
        window.location.href='/studentregistration'
    }

    const logout=()=>{
        window.localStorage.clear();
        window.location.href='/login'
    }

    const studentDetails=()=>{
        window.location.href='/studentdetails'
    }

    const uploadNotice=()=>{
        window.location.href='/notice'
    }

    const deleteNotice=()=>{
        window.location.href='/adminnotice'
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            const user = jwt.decode(token)
            history.push('/login');
        }
      })

    return (
        <div>
            <Header/>
            <h1>Admin Dashboard</h1>
            <button class="btn btn-dark btn-lg" onClick={addStudent}>Add Student</button><br></br>
            <button class="btn btn-light btn-lg" onClick={studentDetails}>View Student Details</button><br></br>
            <button class="btn btn-dark btn-lg" onClick={uploadNotice}>Upload Notice</button><br></br>
            <button class="btn btn-light btn-lg" onClick={deleteNotice}>Delete Notice</button><br></br>  
            <br></br>        
            <button class="btn btn-dark" onClick={logout}>Logout</button>
        </div>
    )
}

export default AdminDashboard