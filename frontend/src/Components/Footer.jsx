import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='mt-20'>
      {/* Main Footer */}
      <div className='bg-gradient-to-b from-slate-900 via-gray-900 to-black text-white py-20 relative overflow-hidden'>
        {/* Snow effect background */}
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20'></div>
          <div className='absolute top-0 left-0 w-full h-full snowflakes'></div>
        </div>

        <div className='max-w-7xl mx-auto px-6 relative z-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left'>
            
            {/* Brand & Newsletter */}
            <div className='space-y-6'>
              <div className='flex items-center gap-3'>
                {/* I have to add my own logo */}
                <div>
                  <h3 className='text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent'>WinterWear</h3>
                  <p className='text-blue-300 text-sm'>Premium Winter Fashion</p>
                </div>
              </div>
              
              <p className='text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0'>
                Stay warm, stay stylish. Premium winter collection crafted for the bold.
              </p>
              
              {/* Quick Newsletter */}
             
            </div>

            {/* Quick Links */}
            <div>
              <h4 className='text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>Quick Links</h4>
              <div className='space-y-3'>
                <NavLink to='/' className='block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300'>Home</NavLink>
                <NavLink to='/collection' className='block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300'>Collection</NavLink>
                <NavLink to='/about' className='block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300'>About</NavLink>
                <NavLink to='/contact' className='block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300'>Contact</NavLink>
              </div>
            </div>

            {/* Shop Categories */}
            <div>
              <h4 className='text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>Shop Categories</h4>
              <div className='space-y-3'>
                <NavLink to='/categories/mens' className='block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300'>Men's Collection</NavLink>
                <NavLink to='/categories/womens' className='block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300'>Women's Collection</NavLink>
                <NavLink to='/categories/kids' className='block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300'>Kids Collection</NavLink>
                <NavLink to='/shop/sale' className='block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300'>Winter Sale</NavLink>
              </div>
            </div>

            {/* Contact & Social */}
            <div className='lg:text-left'>
              <h4 className='text-xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>Stay Connected</h4>
              
              {/* Social Icons */}
              <div className='flex items-center justify-center lg:justify-start gap-4 mb-6'>
                <a href='#' className='group'>
                  <img src={assets.facebook} alt="Facebook" className='w-10 h-10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 opacity-80 group-hover:opacity-100' />
                </a>
                <a href='#' className='group'>
                  <img src={assets.instagram} alt="Instagram" className='w-10 h-10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 opacity-80 group-hover:opacity-100' />
                </a>
                <a href='#' className='group'>
                  <img src={assets.twitter} alt="Twitter" className='w-10 h-10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 opacity-80 group-hover:opacity-100' />
                </a>
                <a href='#' className='group'>
                  <img src={assets.whatsapp} alt="WhatsApp" className='w-10 h-10 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 opacity-80 group-hover:opacity-100' />
                </a>
              </div>

              {/* Contact Info */}
              <div className='space-y-2 text-sm'>
                <p className='flex items-center gap-2 text-gray-300'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.27 7.27c.883.883 2.317.883 3.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'/>
                  </svg>
                  support@winterwear.com
                </p>
                <p className='flex items-center gap-2 text-gray-300'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'/>
                  </svg>
                  +91 98765 43210
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-800 mt-16 pt-12'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
              <div className='flex items-center gap-6 text-gray-400'>
                <span>🛡️ Secure Payments</span>
                <span>🚚 Free Shipping</span>
                <span>🔄 Easy Returns</span>
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <span className='text-gray-500'>©</span>
                <span>{new Date().getFullYear()}</span>
                <span className='text-gray-500'>WinterWear.</span>
                <span className='text-blue-400 font-semibold'>All rights reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </footer>
  )
}

export default Footer;
