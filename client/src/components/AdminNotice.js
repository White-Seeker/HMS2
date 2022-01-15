import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header.js'
import noticeCSS from '../notice.module.css';

const item=[];

export default class Fetch extends React.Component{

    state={
        loading: true,
        person: null,
    }

    async delete(value){
        const nid={nid: value}
        const response = await axios.post('http://localhost:1337/api/noticedelete',nid);
        window.location.reload(false);
    }

    async componentDidMount(){
        const url="http://localhost:1337/api/notice";
        const response = await fetch(url);
        const data = await response.json();
        for(let i=data.user.length-1;i>=-1;i--){
            this.setState({person: data, loading: false})
            item.push(data.user[i]);
            console.log(data.user[0])
        }

    }

    render(){
        return <div>
        <Header/>
            <h1>Notice Board</h1>
            <p>Updates on upcoming events, important announcements and other reminders.</p>
            <div className={noticeCSS.outer}>{item.map(i => 
            <div class= "alert alert-secondary">
                <h6><strong>{i.noticetitle}</strong></h6>
                <p>{i.notice}</p>
                <p>Undersigned: <i>{i.name}</i></p>
                <button class="btn btn-danger" onDoubleClick={()=>this.delete(i.nid)}>Delete</button>
            </div>
            )}</div>
            
        </div>
    }
}