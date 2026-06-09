import axios from 'axios';
import React, { useRef, useState, useEffect, useContext } from 'react';
import {toast} from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

// i need information of the  user here for resending the  otp atleast email 





const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isComplete, setIsComplete] = useState(false);
  const inputRefs = useRef([]);  // usage of userRef should be mastered
  const [loading,setLoading] = useState(false);
  const{backendUrl,verificationToken,setVerificationToken,userToken,setUserToken  } = useContext(ShopContext);

  const navigate = useNavigate();
  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    
    if (newOtp.every(digit => digit !== '')) {
      setIsComplete(true);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = pasteData.split('').concat(Array(6 - pasteData.length).fill(''));
    setOtp(newOtp);
    inputRefs.current[5].focus();
    if (newOtp.every(digit => digit !== '')) setIsComplete(true);
  };






  // ================================= REQUEST OF THE OTP WILL BE HANDLED HERE======================
const handleOtpRequest = async () => {
  try {
    const otpString = otp.join(''); 
    
   
    const payload = {
      otp: otpString,
      verificationToken: verificationToken 
    };
    
    
    const { data } = await axios.post(
      backendUrl + '/api/user/otp', 
      payload
    );
    
    console.log(data)
    if (data.success) {

      setUserToken(data.userToken);
      toast.success('Verified successfully!');
      localStorage.setItem('userToken',data.userToken);
      navigate('/'); 
      
    } else {
      toast.error(data.message || 'Verification failed');
    }
  } catch (error) {
    console.error('OTP Error:', error.response?.data || error.message);
    toast.error(error.response?.data?.message || 'Verification failed');
  } finally {
    setLoading(false); 
  }
};


// ==================== HANDLING RESENDING OTP REQUEST HERE ===================


const handleResentOTP = async() => {
  try{
    const payload = {verificationToken : verificationToken};
    const {data} = await axios.post(backendUrl +  "/api/user/resend-otp" , payload );
    if(data.success){
      toast.info("Check Your Email Again!");
    }else{
      toast.error("Error in sending Otp");
    }
  }catch(error){
    toast.error("Resending Failed");
    
  }

}









  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h1>
          <p className="text-gray-600">Enter the 6-digit code sent to your phone</p>
        </div>

        <div 
          className="grid grid-cols-6 gap-4 mb-6 p-4 bg-gray-50 rounded-xl"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full h-16 text-2xl font-mono text-center bg-white border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm"
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {isComplete && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-xl mb-6 text-center font-medium">
            SUBMIT YOUR OTP
          </div>
        )}

        <div className="space-y-4">
          <button 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {event.preventDefault(); handleOtpRequest()}}
          >
            Verify OTP
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Didn't receive code? 
              {/* Adding logic here to resend the otp for the user */}
              <button className="font-semibold text-blue-600 hover:text-blue-700 ml-1" onClick={() => handleResentOTP()}>
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
