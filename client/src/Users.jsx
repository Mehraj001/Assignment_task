import React, { useState ,useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'

function Users(){
    const [users,setUsers]=useState([])

  useEffect(()=>{
         axios.get('http://localhost:3001')
         .then(result=>setUsers(result.data))
         .catch(err=>console.log(err))
    },[])


    const handelDelete=(id)=>{
      axios.delete('http://localhost:3001/deleteUser/'+id)
      .then(result=>{setUsers(result.data)
        window.location.reload()
      })
      .catch(err=>console.log(err))
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">Add Item+</Link>
        <table className='table'>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>UserName</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
                {
                    users.map((user)=>{
                        return<tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.username}</td>
                            <td>
                            <Link to={`/update/${user._id}` } className="btn btn-success">Update</Link>
                            <button className="btn btn-danger" onClick={(e)=>handelDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users;
