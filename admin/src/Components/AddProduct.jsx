import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const AddProduct = () => {
  return (
    <Link to="/add-product">
      <div className='max-w-fit bg-green-600 rounded-xl px-2 bg-gradient-to-r from-green-950 to-green-400 mt-2'>
        <h1 className='flex flex-row gap-2 p-2'>
          <img src={assets.addProducts} alt="" className='w-6 h-6' />
          <span className='text-lg font-semibold text-white'>Add Product</span>
        </h1>
      </div>
    </Link>
  )
}

export default AddProduct