import React from 'react'
import { assets } from '../assets/assets.js';
import { Link } from 'react-router-dom';
const FirstLine = ({ text , path}) => {
    return (
        <Link to= {path || '/'} className='flex flex-row gap-4 m-1 p-2 cursor-pointer hover:bg-blue rounded-xl transition-all duration-200 group'>
            <h1 className='text-lg font-outfit font-light text-gray-700 group-hover:text-gray-900 transition-colors duration-200 underline'>
                {text}
            </h1>
              <h1 className='text-lg text-gray-400 group-hover:text-gray-900 transition-colors duration-200'>|</h1>
      <h1 className='hidden md:flex flex-row gap-1.5 mt-0.5 items-center group-hover:text-gray-950 transition-colors duration-200'>
        <img 
          src={assets.bag} 
          alt="e-Commerce" 
          className='w-5 h-5 transition-all duration-200 group-hover:scale-110 group-hover:brightness-110'
        />
        <p className='text-sm text-gray-600 group-hover:text-gray-900 underline'>eCommerce</p>
      </h1>
            




        </Link>
    )
}

export default FirstLine