import React from 'react';

const Newsletter = () => {
  return (
    <div className='py-20 bg-gradient-to-b from-slate-50 to-white'>
      <div className='max-w-4xl mx-auto px-6 text-center'>
        {/* Title */}
        <div className='mb-8'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent drop-shadow-lg'>
            Stay Updated
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Subscribe now and get <span className='font-bold text-blue-600'>20% OFF</span> your first order + exclusive deals
          </p>
        </div>

        {/* Newsletter Form */}
        <form className='flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-2xl border border-gray-100'>
          <input 
            type="email" 
            placeholder='Enter your email address'
            className='flex-1 px-6 py-5 text-lg outline-none bg-white rounded-3xl border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 placeholder-gray-500 transition-all duration-300'
            required 
          />
          <button 
            type='submit' 
            className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg px-12 py-5 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap min-w-[140px]'
          >
            Get 20% OFF
          </button>
        </form>

        {/* Trust indicators */}
        <div className='mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            <span>10K+ Subscribers</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-green-500 rounded-full'></div>
            <span>Secure & Private</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
