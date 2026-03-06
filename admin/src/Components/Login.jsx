import React, { useState } from 'react'
import axios from 'axios';
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const Login = () => {

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const onSubmitHandler = async(e) => {

         e.preventDefault()

        try{
            const {data} = await axios.post(`${backendUrl}/api/user/admin`,{email:email,password:password});
            console.log(data);
           
            

        }catch(error){
            console.log(error.message)
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form action="" onSubmit={onSubmitHandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email</p>
                    <input name= {email} onChange = {(e) => setEmail(e.target.value)}className = 'rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Your Email' required />
                    
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input  name = {password} onChange = {(e) => setPassword(e.target.value)} className = 'rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Your password' required />
                </div>
                <button type='submit' className='mt-2 w-full py-2 px-4 bg-black text-white'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login