import React from 'react'
import Header from '../components/Header.js'


function App(){

    const logout=()=>{
        window.localStorage.clear();
        window.location.href='/login'
    }
    return(
        <div>
        <Header/>
        <button class="btn btn-dark" onClick={logout}>Logout</button>
        </div>
        
    )

}

export default App