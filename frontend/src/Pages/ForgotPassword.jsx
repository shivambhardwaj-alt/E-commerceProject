import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Email:', email || 'Phone:', phone);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
          <p className="text-gray-600">Enter your email or phone number to reset</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm"
            />
          </div>

          <div className="relative">
            <div className="absolute bottom-3 left-1 flex items-center pointer-events-none">
              <div className="text-center w-12 h-12 bg-gray-50 border-r border-gray-200 rounded-l-xl flex items-center justify-center">
                <span className="text-gray-500 font-medium">OR</span>
              </div>
            </div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full pl-16 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 hover:border-gray-300 shadow-sm"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!email && !phone}
          >
            Send Reset Link
          </button>

          <div className="text-center">
           <Link to={`/login`}>
           Remembered your password? <span className="font-semibold text-blue-600 hover:text-blue-700">Back to Login</span>
           </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
