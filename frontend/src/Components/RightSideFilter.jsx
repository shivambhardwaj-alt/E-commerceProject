import React from 'react'

const RightSideFilter = () => {
  const setRightSideFilter = (e) => {
    const value = e.target.value;
    console.log(value);
  }

  return (
    <div className=''>
      <select 
        name="sort" 
        id="sort" 
        onChange={setRightSideFilter} 
        className='w-48 px-4 py-3 bg-white border-2 border-black text-black font-medium text-sm rounded-lg shadow-lg hover:shadow-xl hover:border-gray-800 focus:outline-none focus:ring-4 focus:ring-black/10 focus:border-black transition-all duration-200 cursor-pointer'
      >
        <option className='bg-white text-black font-medium' value="recommended">Recommended</option>
        <option className='bg-white text-black font-medium' value="low-to-high">Low to High</option>
        <option className='bg-white text-black font-medium' value="high-to-low">High to Low</option>
        <option className='bg-white text-black font-medium' value="relevant">Relevance</option>
        <option className='bg-white text-black font-medium' value="new-arrivals">New Arrivals</option>
      </select>
    </div>
  )
}

export default RightSideFilter
