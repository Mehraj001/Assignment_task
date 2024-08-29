import React, { useState } from 'react'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
function CreateUser(){
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [phone,setPhone]=useState()
  const [username,setUserName]=useState()
  const navigate=useNavigate();
  const Submit=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/createUser',{name,email,phone,username})
    .then(result=>{
        console.log(result)
        navigate('/')
  })
        
    .catch(err=>console.log(err))
  }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className="w-50 bg-white rounded p-3">
       <form 
       onSubmit={Submit} 
       >
        <h2>ADD User</h2>
        <div className="mb-2">
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Enter Name'
             className='form-control'
             onChange={(e)=>setName(e.target.value)}
             />
        </div>
        <div className="mb-2">
            <label htmlFor="">Email</label>
            <input type="text" placeholder='Enter Your Email' className='form-control'
            onChange={(e)=>setEmail(e.target.value)}
            />
        </div>
        <div className="mb-2">
            <label htmlFor="">Phone</label>
            <input type="text" placeholder='Phone Number' className='form-control'
            onChange={(e)=>setPhone(e.target.value)}
            />
        </div>
        <div className="mb-2">
            <label htmlFor="">UserName</label>
            <input type="text" placeholder='User Name' className='form-control'
            onChange={(e)=>setUserName(e.target.value)}
            />
        </div>
        <button className='btn btn-success'>Submit</button>
       </form>
      </div>
    </div>
  )
}

export default CreateUser;
