import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const AddProduct = () => {
  return (
    <Link to="/add-product">
      <div className='max-w-fit rounded-xl px-2 mt-2 border border-gray-500 transition-all duration-300 hover:scale-105 hover:bg-gray-600'>
        <h1 className='flex flex-row gap-2 p-2'>
          <img src={assets.plus} alt="" className='w-5 h-5' />
          <span className='text-sm '>Add Product</span>
        </h1>
      </div>
    </Link>
  )
}

export default AddProduct