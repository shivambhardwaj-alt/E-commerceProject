import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';


const Login = () => {
  const { backendUrl, userToken, setUserToken, verificationToken, setVerificationToken} = useContext(ShopContext);
  const [currname, setCurrName] = useState("");
  const [curremail, setCurrEmail] = useState("");
  const [currpassword, setCurrPassword] = useState("");
  const [currentState, setCurrentState] = useState('Sign Up');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const[googleData,setGoogleData] = useState();
  const navigate = useNavigate();

  // ====================== HERE ON SUBMIT HANDLE FORM SUBMISSION ======================

  const onSubmitHandler = async () => {
    if (!curremail || !currpassword || (currentState === 'Sign Up' && !currname)) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endPoint = currentState === 'Sign Up' ? '/register' : '/login';
      const urlForRequest = backendUrl + '/api/user' + endPoint;

      const payload = currentState === 'Sign Up'
        ? { name : currname,email :  curremail, password : currpassword }
        : { email : curremail, password : currpassword };
      
        // assign data here

      const { data } = await axios.post(urlForRequest, payload);
      

      if (currentState === 'Sign Up') {
        if (data.success) {
          toast.success(data.message);
          setVerificationToken(data.verificationToken);
          navigate('/otp-verification');
        } else {
          toast.error(data.message || 'Registration failed');
        }
      } else {
        if (data.success) {
          localStorage.setItem('userToken', data.userToken);
          toast.success('Login Successful');
          navigate('/');
        }
      }

    } catch (error) {
      const serverData = error.response?.data;
      console.error('Error:', serverData || error.message);

      
      if (serverData?.next_step === 'otp-verification') {
        toast.info(serverData.alert_data || 'Please verify your account');
        navigate('/otp-verification');
      } else {
        toast.error(serverData?.message || 'Something went wrong');
      }

    } finally {
      setLoading(false);
    }
  };






  const googleLogin =  useGoogleLogin({
    onSuccess : async(tokenResponse) => {

      try{
      const access_token = tokenResponse.access_token;
      const tempGoogleData = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo" , {
        headers : {
          Authorization : `Bearer ${access_token}`,
        }
      })
  
      setLoading(true);
      
      // ================= Now sending information to the  backend here
      const payload = tempGoogleData.data ;
      setGoogleData(tempGoogleData.data);
      const  { data  }= await axios.post(backendUrl+"/api/user/google-Auth",payload);
      if(data.success){
        localStorage.setItem("userToken" , data.userToken);
        toast.success("Login Successful");
        navigate('/');
      }
    }catch(error){
      toast.error("Login Failed");
    }finally{
      setLoading(false);
    }

      

    },
    onError : () =>{
      toast.error("Login Failed");
    }

  })












  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 flex items-center justify-center p-6'>
      <div className='w-full max-w-md'>
        {/* Clean Card */}
        <div className='bg-white/90 backdrop-blur-xl border border-blue-100/50 rounded-2xl shadow-2xl p-8 space-y-8'>

          {/* Header */}
          <div className='text-center space-y-3'>
            <h1 className='text-3xl font-bold text-gray-900 prata-regular'>Frost Collection</h1>
            <p className='text-blue-600 text-lg font-medium prata-regular'>{currentState}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl'>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); onSubmitHandler(); }} className='space-y-6'>
            {currentState === 'Sign Up' && (
              <div>
                <label className='block text-sm text-gray-700 font-medium mb-2 '>Full Name</label>
                <input
                  onChange={(e) => setCurrName(e.target.value)}
                  type="text"
                  className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 focus:outline-none transition-all duration-300 shadow-sm'
                  placeholder='Enter your full name'
                  value={currname}
                  required
                />
              </div>
            )}

            <div>
              <label className='block text-sm text-gray-700 font-medium mb-2'>Email Address</label>
              <input
                onChange={(e) => setCurrEmail(e.target.value)}
                type="email"
                className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 focus:outline-none transition-all duration-300 shadow-sm'
                placeholder='your@email.com'
                value={curremail}
                required
              />
            </div>

            <div>
              <label className='block text-sm text-gray-700 font-medium mb-2'>Password</label>
              <input
                onChange={(e) => setCurrPassword(e.target.value)}
                type="password"
                className='w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 focus:outline-none transition-all duration-300 shadow-sm'
                placeholder='••••••••'
                value={currpassword}
                required
              />
            </div>

            {/* Actions */}
            <div className='space-y-2'>
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl border border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2'
              >
                {loading ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                    Processing...
                  </>
                ) : (
                  currentState === 'Login' ? 'Sign In' : 'Create Account'
                )}
              </button>

              <div className='flex items-center justify-between text-xs text-gray-500 pt-2'>
                <Link to="/forgot-password" className='hover:text-blue-700 cursor-pointer'>Forgot Password?</Link>
                <button
                  type='button'
                  onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                  className='text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors'
                >
                  {currentState === 'Login' ? 'Create new account' : 'Sign in instead'}
                </button>
              </div>
            </div>
          </form>

          {/* Divider */}
          <div className='relative text-center text-xs text-gray-500 uppercase before:absolute before:inset-0 before:border-t before:border-gray-200/50'>
            <span className='relative bg-white/90 px-4'>or continue with</span>
          </div>

          {/* Social Login */}
          <div className='grid grid-cols-2 gap-3 pt-4'>
            <button onClick={() => googleLogin()} className='flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02]'>
              <svg className='w-5 h-5' viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              </svg>
              Google
            </button >
            <button className='flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-700 transition-all duration-300 hover:shadow-md hover:scale-[1.02]'>
              <svg className='w-5 h-5' viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
              </svg>
              Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
