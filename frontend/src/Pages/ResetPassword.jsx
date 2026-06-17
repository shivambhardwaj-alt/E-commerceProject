import React, { useReducer } from 'react'

const ResetPassword = () => { 
  // change this  thing here 
    function reducer(state,action){
      switch(action.type){
        case "PASSWORD":
          return {...state, password : action.payload};
        case "CONFIRMPASSWORD":
          return {...state,confirmPassword : action.payload}
      }
    }

    const initialState = {
      password : "",
      confirmPassword : "",
    }


  const {state,dispatch} = useReducer(reducer,initialState);
  return (
    <div className=''>
      resetPassword




    </div>
  )
}

export default ResetPassword