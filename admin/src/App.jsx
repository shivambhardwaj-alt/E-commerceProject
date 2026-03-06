import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Add from '../src/Pages/Add.jsx';
import Order from '../src/Pages/Order.jsx';
import List from '../src/Pages/List.jsx';
import {Route,Routes} from 'react-router-dom';
import Login from './Components/Login.jsx';
const backendURL = "https://localhost:4000";

const App = () => {
  const [token,settoken] = useState("");
  return (
    <div className='bg-gray-50 min-h-screen'>
       {token=== "" && <Login settoken= {settoken} />}
      <>
      <Navbar />
      
      <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
        <Routes>
        <Route path = '/add' element  = {<Add />} />
        <Route path = '/orders'element  = {<Order />} />
        <Route path = '/list' element = {<List />} />
        </Routes>

        </div>

      </div>
      </>
      
      
      
      

    </div>
  )
}

export default App