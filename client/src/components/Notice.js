import React, {useEffect,useState} from 'react'
import axios from 'axios'
import Header from './Header.js'
import noticeCSS from '../notice.module.css';

function Notice () {

    const [name,setName] = useState('')
    const [noticetitle,setNoticetite] = useState('')
    const [notice,setNotice] = useState('')

    const noticePage = () =>{
        window.location.href='/notice';
    }

    //Publish Notice
    axios({
        method: 'get',
        url: 'https://api.github.com/users/hacktivist123',
      });

    async function publishNotice(event){
        event.preventDefault()
        const response = await fetch('http://localhost:1337/api/notice',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                name,
                noticetitle,
                notice,
                notices:[]
            }),
        })
        const data=await response.json()
        if (data.status == 'ok') {
            alert('Notice Published')
		}
    }

    return(
        <div>
        <Header />
            <h1>Publish Notice</h1>
            <div className={noticeCSS.outer}>
            <div class= "alert alert-secondary">
                <h6><strong>{noticetitle}</strong></h6>
                <p>{notice}</p>
                <p>{name}</p>
            </div>
            </div>

            <form onSubmit={publishNotice}>
            <input
					value={noticetitle}
                    onChange={(e) => setNoticetite(e.target.value)}
                    type="text"
                    placeholder="Notice Title"
                    class="input-control"
				/>
				<br />
                <input
					value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Undersigned name"
                    class="input-control"
				/>
				<br />
				<input
					value={notice}
                    onChange ={(e) => setNotice(e.target.value)}
                    type="text"
                    placeholder="Notice"
                    class="input-control" 
				/>
				<br />
				<input class="btn btn-dark input-control" type="submit"  value="Publish" onClick={{noticePage}}/>
			</form>
        </div>
    )
}

export default Notice