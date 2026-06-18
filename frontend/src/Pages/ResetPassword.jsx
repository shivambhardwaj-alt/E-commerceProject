import React, { useReducer } from 'react'
import {toast} from 'react-toastify';
import axios from "axios";
import { useContext } from 'react';
import {ShopContext} from '../context/ShopContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  function reducer(state, action) {
    switch (action.type) {
      case "PASSWORD":
        return { ...state, password: action.payload };
      case "CONFIRMPASSWORD":
        return { ...state, confirmPassword: action.payload }
      case "ONFOCUSCONFIRMPASSWORD":
        return { ...state, OnFocusConfirmPassword: action.payload }
      case "ONFOCUSPASSWORD":
        return { ...state, OnFocusPassword: action.payload }
      case "SETLOADING" :
        return {... state, setLoading : action.payload}
      default:
        return state
    }
  }

  const initialState = {
    password: "",
    confirmPassword: "",
    OnFocusPassword: false,
    OnFocusConfirmPassword: false,
    setLoading : false,
  }


  const params = useParams();
  const token = params.token;




  const navigate = useNavigate();
  const {backendUrl ,userToken} = useContext(ShopContext);
  const handleResetPassword = async() => {
    try{
        // just validate on the frontend
      
      if(state.password !== state.confirmPassword){
        toast.error("not matched");
        return ;
      }
      const payload = {password : state.password ,  confirmPassword : state.confirmPassword , token : token };
      console.log(payload);
      const {data}  = await axios.post(backendUrl + '/api/user/resetting-password',payload);
      if(data.success){
        dispatch({type : "SETLOADING" , payload : false});
        toast.success("Successful");
        localStorage.setItem("userToken" , data.token);
        if(data.success){
          navigate('/');
        }
      }else{
        dispath({type : "SETLOADING" , payload : false});
        toast.error("Failed");
      }
    
    }catch(error){
      dispatch({type : "SETLOADING" , payload : false});
      toast.error('try again!')
    }


  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 p-2'>
      <div className='flex-col items-center justify-start w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
        <h1 className='text-center text-2xl font-bold text-gray-800 mb-2'>Reset Password</h1>
        <p className='text-center text-sm text-gray-500 mb-8'>Create a new strong password</p>
        
        <div className='flex flex-col items-center w-full'>
          <label htmlFor="Password" className='text-gray-700 font-medium self-start mb-2'>Password</label>
          <input
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: "PASSWORD",
                payload: e.target.value,
              })
            }
          placeholder="********"
            onFocus={() =>
              dispatch({
                type: "ONFOCUSPASSWORD",
                payload: true,
              })
            }
            onBlur={() =>
              dispatch({
                type: "ONFOCUSPASSWORD",

                payload: false,
              })
            }
            
            className={`border border-gray-500 rounded-xl w-full max-w-[300px] px-4 py-3 ${state.OnFocusPassword
              ? "outline-none outline-blue-500 border-none transition-all duration-200 scale-105"
              : ""
              }`}
          />
          
          <label htmlFor="confirmPassword" className='text-gray-700 font-medium self-start mb-2 mt-4'>Confirm password</label>
          <input 
            type="password" 
            id='confirmPassword' 
            value={state.confirmPassword} 
            onFocus={() =>
              dispatch({
                type: "ONFOCUSCONFIRMPASSWORD",
                payload: true,
              })
            }
            placeholder="********"
            onBlur={() =>
              dispatch({
                type: "ONFOCUSCONFIRMPASSWORD",
                payload: false,
              })
            }
            className={`border border-gray-500 rounded-xl w-full max-w-[300px] px-4 py-3 ${state.OnFocusConfirmPassword
              ? "outline-none outline-blue-500 border-none transition-all duration-200 scale-105"
              : ""
              }`} 
            onChange={(e) => dispatch({ type: "CONFIRMPASSWORD", payload: e.target.value })} 
          />
          
          <button 
            className={`w-full max-w-[300px] bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl mt-6 hover:bg-blue-700 transition-colors duration-200 ${state.setLoading ? "bg-blue-400 active:default:" : ""}`} onClick={() => {handleResetPassword() ;  dispatch({type : "SETLOADING", payload : true})}}
          >
            {state.setLoading ? "Resetting..." : "Reset password"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword