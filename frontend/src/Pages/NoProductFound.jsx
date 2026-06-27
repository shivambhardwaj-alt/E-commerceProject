import React from 'react'
import { assets } from '../assets/assets'

const NoProductFound = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-10'>
            <img src={assets.found} alt="found-immage" className='w-80 h-80' />
            <div className='flex flex-col items-center justify-center'>
                <h1 className='text-4xl text-gray-500 tracking-wide'>No Result Found</h1>
                <h2 className='text-xl text-gray-400 tracking-wider'>We Couldn't find what you are looking for ..</h2>
            </div>

        </div>
    )
}

export default NoProductFound