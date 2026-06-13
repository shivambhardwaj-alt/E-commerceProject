import React from 'react'
import UploadPage from './pages/UploadPage.jsx';
import Login from "./pages/Login.jsx";
import Sidebar from './components/Sidebar.jsx';
import { adminContext } from './context/AdminContext.jsx';
import { useContext } from 'react';
import {Routes,Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Order from './pages/Order.jsx';
import Customers from './pages/Customers.jsx'

import Product from './pages/Product.jsx';
import Navbar from './components/Navbar.jsx';
const App = () => {
  const {adminToken,setAdminToken} = useContext(adminContext) ;
  return (

    (adminToken !== null ? <Login /> :
   
    <div className='flex flex-row flex-1 gap-5 sm:gap-8 md:gap-10 lg:gap-20 overflow-hidden'>
      <Sidebar  className = ''/>
        <div className=' transition-all ml-40 duration-300  md:ml-44 w-[calc(100%-16rem)] sm:ml-32 lg:ml-56'>
      <div className='flex-1 sm:p-2 max-w-full'>
        <Routes>
          <Route path = '/' element = {<Dashboard />}/>
          <Route path = '/orders' element = {<Order />} />
           <Route path = '/customers' element = {<Customers />} />
           
           <Route path='/products' element = {<Product />} />
           <Route path = 'add-product' element  = {<UploadPage />} />
        </Routes>
        
      </div>
  </div>
    </div>
  ))
}

export default App