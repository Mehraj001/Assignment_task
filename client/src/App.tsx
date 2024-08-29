import { useState } from 'react'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import Users from './Users';
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Components/Navbar'
import SignUp from './Components/SignUp';
import Login from './Components/Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Navbar/>
     <Routes>
      <Route path='/' element={<Users/>}></Route>
      <Route path='/create' element={<CreateUser/>}></Route>
      <Route path='/update/:id' element={<UpdateUser/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
     </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
