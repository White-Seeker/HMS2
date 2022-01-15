import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import Header from './Header.js'
import noticeCSS from '../notice.module.css';

const item=[];
const notAllotted=[];
const searchData=[];
const email='';

export default class AllottedStudents extends React.Component{
    
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
                if(data.user[i].room==x ||  
                    data.user[i].block==x || 
                    data.user[i].phone==x ||
                    data.user[i].name.toLowerCase()==x.toLowerCase())
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
                if(data.user[i].room!=null){
                    item.push(data.user[i]);
                    console.log(data.user[0])
                }
                else if(data.user[i].room==null){
                    notAllotted.push(data.user[i]);
                }
            }
        }
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
            <h1>Allotted Students</h1>

            <input class="input-control" type="text" placeholder="Search"
            onChange={(evt) => {var x=evt.target.value; 
            this.componentDidMount(x) }} />

            <button class="btn btn-dark" onClick={this.refreshPage}>Clear</button>

            <div className={noticeCSS.outer}>
                    <table class="table table-hover table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Room Number</th>
                                <th scope="col">Block</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Roll Number</th>
                            </tr>
                        </thead>
                    </table>
            </div>
         
            <div className={noticeCSS.outer}>{item.map(user => 
                    <table class="table table-hover table-striped table-dark">
                        <tbody>
                            <tr scope="row">
                                <td>{user.name}</td>
                                <td>{user.room}</td>
                                <td>{user.block}</td>
                                <td>{user.phone}</td>
                                <td>{user.roll}</td>
                            </tr>
                        </tbody>             
                    </table>                
            )}</div>
            
            <h1>Unallotted Students</h1>
            <div className={noticeCSS.outer}>{notAllotted.map(user2 => 
                <table class="table table-hover table-striped table-dark">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Roll Number</th>
                    </tr>
                </thead>
                     <tbody>
                        <tr scope="row">
                            <td>{user2.name}</td>
                            <td>{user2.phone}</td>
                            <td>{user2.roll}</td>
                        </tr>
                    </tbody>             
                </table>       
            )}</div>
        </div>
    }
}