import React  from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets';
const Login = () => {

    const[form, setForm] = useState({
        email : '',
        phoneNumber : '',
        password : '',
     })



     // ===================function to  handle on submit form =========================




     const onSubmitHanlder = () => {
        event.preventDefault()
        try{


        }catch(error){
            
        }
     }








  return (

    <div className='flex flex-row items-center justify-center'>
      
    <div className='flex flex-col items-center justify-between mt-5 bg-[#fff]'>
    <div className='min-w-[600px] max-h-[550px] bg-white rounded-xl shadow-xl '>
        <div className='flex flex-col items-center justify-between max-h-full mt-2 p-7 gap-1'>
            <h1 className='text-blue-400 text-3xl font-bold m-2'> Winter-X</h1>
            <img src={assets.secure} alt="logo" className='w-10 h-10' />
             <h1 className='text-2xl text-gray-900 font-bold '>Sign In with email</h1> 
            <input type="email" placeholder='Email'  id = 'email' name = 'email' className='text-left rounded-lg w-70 focus:outline focus:ring-2 focus:ring-blue-400 bg-slate-100 px-2 py-2 mt-2' onChange={(e) => setForm({...form, [e.target.name] : e.target.value})}/>
            <p className='text-gray-500 w-fit '>Or</p>
            <input type="number" placeholder='Mobile Number' id = 'password' name = 'phoneNumber' className='text-left rounded-lg w-70 focus:outline focus:ring-2 focus:ring-blue-400 bg-slate-100 px-2 py-2 mt-1' onChange={(e)  => setForm({...form , [e.target.name] :e.target.value})}/>
            <input type="password" placeholder  = 'password' id = 'password' name = 'password' className='text-left rounded-lg w-70 focus:outline focus:ring-2 focus:ring-blue-400 bg-slate-100 px-2 py-2 mt-2' onChange={(e) =>  {setForm({...form, [e.target.name] :e.target.value})}} />
                <button type='submit' className='w-50  m-6 px-10 py-3 bg-slate-900 cursor-pointer rounded-xl text-white transition duration-300 hover:bg-slate-400 hover:scale-105 '>Get Started</button>
            <div className='flex flex-row gap-2 cursor-pointer'>
            <img src={assets.google} alt="googleImg" className='w-5 h-5'/>
                <p className='text-sm text-gray-600 font-bold transition duration-100 hover:text-md hover:scale-105'>Sign in with Google</p>
            </div>
        </div>
    </div>
  </div>  

  </div>
  )
}

export default Login