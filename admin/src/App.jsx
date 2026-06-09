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
import Marketing from './pages/Marketing.jsx';
import Product from './pages/Product.jsx';
const App = () => {
  const {adminToken,setAdminToken} = useContext(adminContext) ;
  return (

    (adminToken !== null ? <Login /> :
    <div className='flex flex-row flex-1'>
      <Sidebar />
      <div className='flex-1'>
        <Routes>
          <Route path = '/' element = {<Dashboard />}/>
          <Route path = '/orders' element = {<Order />} />
           <Route path = '/customers' element = {<Customers />} />
           <Route path = '/marketing' element = {<Marketing />} />
           <Route path='/products' element = {<Product />} />
           <Route path = 'add-product' element  = {<UploadPage />} />
        </Routes>
        
      </div>
  
    </div>
  ))
}

export default App