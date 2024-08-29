import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'


function UpdateUser(){
  const {id} =useParams()
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [phone,setPhone]=useState()
  const [username,setUserName]=useState()
  const navigate=useNavigate(); 
   
  useEffect(()=>{
    axios.get('http://localhost:3001/getUser/'+id)
    .then(result=>{console.log(result)
      setName(result.data.name)
      setEmail(result.data.email)
      setPhone(result.data.phone)
      setUserName(result.data.username)
    })
    .catch(err=>console.log(err))
},[])

const Update=(e)=>{
  e.preventDefault();
  axios.put('http://localhost:3001/updateUser/'+id,{name,email,phone,username})
  .then(result=>{
      console.log(result)
      navigate('/')
})
      
  .catch(err=>console.log(err))
}


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className="w-50 bg-white rounded p-3">
     <form onSubmit={Update}>
      <h2>Update User</h2>
      <div className="mb-2">
          <label htmlFor="">Name</label>
          <input type="text" placeholder='Enter Name' className='form-control' value={name}  onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className="mb-2">
          <label htmlFor="">Email</label>
          <input type="text" placeholder='Enter Email' className='form-control' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div className="mb-2">
          <label htmlFor="">Phone</label>
          <input type="text" placeholder='Phone Number' className='form-control' value={phone}  onChange={(e)=>setAge(e.target.value)}/>
      </div>
      <div className="mb-2">
          <label htmlFor="">UserName</label>
          <input type="text" placeholder='Enter UserName' className='form-control' value={username}  onChange={(e)=>setAge(e.target.value)}/>
      </div>
      <button className='btn btn-success'>Submit</button>
     </form>
    </div>
  </div>
  )
}

export default UpdateUser
