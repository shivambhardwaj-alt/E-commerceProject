import React, { useState, useRef, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { assets } from '../assets/assets';

const Filter = ({ filterState, dispatch }) => {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);


  const { search, startDate, endDate, isFocused, status, sortBy } = filterState;

  
  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const activeCount = (status ? 1 : 0) + (sortBy ? 1 : 0);

  return (
    <div className='flex flex-col md:flex-row gap-2'>

      {/* Search */}
      <div className={`flex items-center border gap-2 pl-3 transition-all duration-300 rounded-full bg-white w-full md:w-52
        ${isFocused ? 'border-blue-500 border-2 h-10' : 'border-gray-300 h-9'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 30 30" fill="#9CA3AF">
          <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
        </svg>
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
          onFocus={() => dispatch({ type: 'SET_FOCUSED', payload: true })}
          onBlur={() => dispatch({ type: 'SET_FOCUSED', payload: false })}
          className='w-full h-full bg-transparent text-sm outline-none placeholder-gray-400'
        />
      </div>

      {/* Start Date */}
      <div className='flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-300 h-9'>
        <img src={assets.calendar} alt="" className='w-4 h-4' />
        <DatePicker
          selected={startDate}
          onChange={(date) => dispatch({ type: 'SET_START_DATE', payload: date })}
          placeholderText="Start Date"
          className='outline-none text-sm w-24'
        />
      </div>

      {/* End Date */}
      <div className='flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-300 h-9'>
        <img src={assets.calendar} alt="" className='w-4 h-4' />
        <DatePicker
          selected={endDate}
          onChange={(date) => dispatch({ type: 'SET_END_DATE', payload: date })}
          placeholderText="End Date"
          className='outline-none text-sm w-24'
        />
      </div>

      {/* Filter Dropdown */}
      <div className='relative' ref={filterRef}>
        <div
          className='flex flex-row items-center gap-2 border rounded-xl px-4 py-1.5 border-gray-300 cursor-pointer hover:bg-gray-50'
          onClick={() => setShowFilter(!showFilter)}
        >
          <img src={assets.filter} alt="" className='w-4 h-4' />
          <p className='text-sm'>Filters</p>
          {activeCount > 0 && (
            <span className='bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
              {activeCount}
            </span>
          )}
        </div>

        {showFilter && (
          <div className='absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-xl rounded-xl z-50 w-44 p-3 flex flex-col gap-3'>

            {/* Sort by Price */}
            <div>
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'>Price</p>
              {[
                { label: 'Low to High', value: 'price-asc' },
                { label: 'High to Low', value: 'price-desc' },
              ].map(opt => (
                <p
                  key={opt.value}
                  onClick={() => dispatch({ type: 'SET_SORT', payload: sortBy === opt.value ? null : opt.value })}
                  className={`text-sm px-2 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50 flex justify-between
                    ${sortBy === opt.value ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
                >
                  {opt.label}
                  {sortBy === opt.value && <span>✓</span>}
                </p>
              ))}
            </div>

            <hr className='border-gray-100' />

            {/* Status */}
            <div>
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'>Status</p>
              {['Shipped', 'Delivered', 'Returned', 'Cancelled', 'Processing'].map(s => (
                <p
                  key={s}
                  onClick={() => dispatch({ type: 'SET_STATUS', payload: status === s ? null : s })}
                  className={`text-sm px-2 py-1.5 rounded-lg cursor-pointer hover:bg-gray-50 flex justify-between
                    ${status === s ? 'text-blue-600 font-medium' : 'text-gray-500'}`}
                >
                  {s}
                  {status === s && <span>✓</span>}
                </p>
              ))}
            </div>

            <hr className='border-gray-100' />

            {/* Reset */}
            <p
              onClick={() => dispatch({ type: 'RESET' })}
              className='text-xs text-center text-red-400 hover:text-red-600 cursor-pointer'
            >
              Reset all filters
            </p>

          </div>
        )}
      </div>

    </div>
  )
}

export default Filter