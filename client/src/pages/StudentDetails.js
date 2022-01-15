import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import Header from '../components/Header.js'
import noticeCSS from '../notice.module.css';


const item=[];
const searchData=[];
const email='';

export default class studentDetails extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            inputValue:'',
        };
    }

    state={
        loading: true,
        person: null,
    }

    async componentDidMount(x){
        const url="http://localhost:1337/api/studentlogin";
        const response = await fetch(url);
        
        const data = await response.json();
        if(x!=null){

            for(let i=0;i<data.user.length;i++){ // This will search for the 
                //particular student
                this.setState({person: data, loading: false})
                if(data.user[i].roll==x || data.user[i].name.toLowerCase()==x.toLowerCase() || 
                    data.user[i].registration==x || 
                    data.user[i].phone==x ||
                    data.user[i].email==x)
                    {
                        item.length=0;
                        item.push(data.user[i]);
                        console.log(item[0]);
                }
            }
        }
        else if(x==null){ //It will load everyone's data initially
            for(let i=data.user.length-1;i>=0;i--){
                this.setState({person: data, loading: false})
                item.push(data.user[i]);
                console.log(data.user[0])
            }
        }
    }

    async delete(value){
        const roll={roll: value}
        const response = await axios.post('http://localhost:1337/api/studentdelete',roll);
        window.location.reload(false);
    }

    refreshPage(){
        window.location.reload();
    } 

    updateInputValue(evt) {
        this.setState({
          inputValue: evt.target.value
        });
      }
    
    render(){
        
        return <div style={{textAlign: 'center'}}>
        <Header/>
            <h1>Student Details</h1>
            <input class="input-control" id="number" type="text"  placeholder="Search"
            onChange={(evt) => {var x=evt.target.value; this.componentDidMount(x) }} />
            <button class="btn btn-dark" onClick={this.refreshPage}>Clear</button>
            {this.state.loading || !this.state.person ? 
           <div>loading...</div> 
            :
            <div class={noticeCSS.outer}>{item.map(student => 
            <div class="alert alert-light">
                <h2><strong>Student</strong></h2>
                <p></p>
                <h2>{student.title}</h2>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll No.:</strong> {student.roll}</p>
                <p><strong>Registration No.:</strong> {student.registration}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>Phone Number:</strong> {student.phone}</p>
                <p><strong>E-mail ID:</strong> {student.email}</p>
                <p><strong>Room:</strong> {student.room}</p>
                <p><strong>Block:</strong> {student.block}</p>
                <button class="btn btn-dark" onDoubleClick={()=>this.delete(student.roll)}>Delete</button>
            </div>
            )}</div>
            }
        </div>
    }
}