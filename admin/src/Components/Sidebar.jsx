import React, { useState } from 'react'
import { assets } from '../assets/assets.js';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { icon: assets.dashboard, label: 'Dashboard', path: '/' },
    { icon: assets.orders, label: 'Orders', path: '/orders' },
    { icon: assets.customer, label: 'Customers', path: '/customers' },
    { icon: assets.order, label: "Products", path: '/products/1' },
    {icon:assets.analytics , label : "Analytics" , path : "/analytics"},// analytics

    {icon : assets.offer , label : "Offers" , path :'/offers'},// settings
    {icon : assets.settings , label:"Settings" , path : '/settings'},// discount



  ];



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);

  }, [])
  return (
    <div className={`h-screen max-w-64 min-w-25 fixed left-0 top-0`}>
      <div
        className={`h-[100vh] relative left-0 border-r border-gray-200 bg-gradient-to-b from-white to-gray-50 shadow-lg transition-all duration-300 ease-in-out
            ${isExpanded ? 'w-50':'w-25'}
        `}
      >
        <nav className='flex flex-col gap-1 items-start p-3'>

          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className='w-full cursor-pointer'
          >
            <h1 className={`bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl px-4 py-2 text-white font-extrabold text-lg tracking-tight transition-all duration-300 shadow-md
              ${isExpanded ? 'hidden md:block pl-5' : 'hidden'}
            `}>
              Winter-X
            </h1>
            <h1 className={` bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg px-3 py-2 text-white font-extrabold text-lg tracking-tight shadow-md transition-all duration-300
              ${isExpanded ? 'md:hidden' : 'block'} 
            `}>
              W-X
            </h1>
          </div>

          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `w-full transition-all duration-300 ease-in-out ${isActive
                  ? 'bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl'
                  : 'hover:bg-blue-50 rounded-xl'
                }`
              }
            >
              <div
                className='flex flex-row gap-3 m-1 p-3 rounded-xl cursor-pointer hover:scale-[1.02] group'
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className='w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:brightness-110'
                />
                <h1 className={`font-light text-sm text-gray-700 transition-all duration-300 group-hover:text-blue-600 whitespace-nowrap
                  ${isExpanded ? 'block' : 'hidden'}
                `}>
                  {item.label}
                </h1>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar