import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='py-20 bg-gradient-to-b from-slate-50/50 to-white'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Easy Exchange */}
          <div className='group text-center p-8 rounded-3xl bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-blue-100 hover:shadow-blue-100/20'>
            <div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg'>
              <img src={assets.exchange_icon} alt="Exchange" className='w-10 h-10' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3 leading-tight'>Easy Exchange Policy</h3>
            <p className='text-gray-600 leading-relaxed'>Hassle-free exchanges within 7 days. Simple returns, no questions asked.</p>
          </div>

          {/* 7 Days Return */}
          <div className='group text-center p-8 rounded-3xl bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-green-100 hover:shadow-green-100/20'>
            <div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg'>
              <img src={assets.quality_icon} alt="Return" className='w-10 h-10' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3 leading-tight'>7 Days Return Policy</h3>
            <p className='text-gray-600 leading-relaxed'>Full refund within 7 days. Your satisfaction is our priority.</p>
          </div>

          {/* Customer Support */}
          <div className='group text-center p-8 rounded-3xl bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 hover:border-purple-100 hover:shadow-purple-100/20'>
            <div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg'>
              <img src={assets.support_img} alt="Support" className='w-10 h-10' />
            </div>
            <h3 className='text-xl font-bold text-gray-900 mb-3 leading-tight'>24/7 Customer Support</h3>
            <p className='text-gray-600 leading-relaxed'>Round-the-clock assistance. We're here whenever you need us.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy;
