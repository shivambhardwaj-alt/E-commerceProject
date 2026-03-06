import React, { useContext, useState, useEffect } from 'react'
import logo from '../assets/logo.png'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const getNavClass = (isActive) => `
  flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
  hover:bg-white/80 hover:text-blue-800 hover:shadow-sm prata-regular
  ${isActive ? 'text-blue-800 bg-white/90 shadow-sm border-b-2 border-blue-500' : 'text-gray-700'}
`;

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { setShowSearch, getCartCount ,userToken,setUserToken} = useContext(ShopContext);
    

    
    

    return (
        <>
            <div className='fixed top-0 left-0 right-0 z-[9999]'>
                <nav className='w-full px-4 py-3 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg'>
                    <div className='max-w-7xl mx-auto flex items-center justify-between'>
                        {/* Logo */}
                        <Link to="/" className='flex-shrink-0'>
                            <img src={assets.logo} className='w-28 h-10 object-contain' alt="Logo" />
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className='hidden md:flex items-center gap-1'>
                            <NavLink to='/' className={({ isActive }) => getNavClass(isActive)}>HOME</NavLink>
                            <NavLink to='/collection' className={({ isActive }) => getNavClass(isActive)}>COLLECTION</NavLink>

                            <li className='relative group'>
                                <div className='px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-white/80 hover:text-blue-800 rounded-md transition-all duration-200 prata-regular'>
                                    CATEGORIES ▼
                                </div>
                                <div className='absolute top-full left-0 mt-1 w-48 bg-white/100 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-200 hidden group-hover:block z-[9999] py-2'>
                                    <NavLink to="/categories/mens" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800 transition-all">Mens</NavLink>
                                    <NavLink to="/categories/womens" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800 transition-all">Womens</NavLink>
                                    <NavLink to="/categories/kids" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800 transition-all">Kids</NavLink>
                                </div>
                            </li>

                            <li className='relative group'>
                                <div className='px-3 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-white/80 hover:text-blue-800 rounded-md transition-all duration-200 prata-regular'>
                                    SHOP ▼
                                </div>
                                <div className='absolute top-full left-0 mt-1 w-52 bg-white/100 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-200 hidden group-hover:block z-[9999] py-2'>
                                    <NavLink to="/shop/new-arrivals" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800 transition-all">New Arrivals</NavLink>
                                    <NavLink to="/shop/best-offers" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800 transition-all">Best Offers</NavLink>
                                    <NavLink to="/shop/sale" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-800 transition-all">Sale</NavLink>
                                </div>
                            </li>

                            <NavLink to='/about' className={({ isActive }) => getNavClass(isActive)}>ABOUT</NavLink>
                            <NavLink to='/contact' className={({ isActive }) => getNavClass(isActive)}>CONTACT</NavLink>
                        </ul>

                        {/* Right side icons */}
                        <div className='flex items-center gap-4'>
                            <img
                                onClick={() => setShowSearch(true)}
                                src={assets.search_icon}
                                className='w-5 h-5 cursor-pointer hover:scale-110 transition-transform'
                                alt="Search"
                            />

                            <div className="relative group">
                                {/* Profile Icon */}
                                <img
                                    src={assets.profile_icon}
                                    className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
                                    alt="Profile"
                                />

                                {/* User Dropdown */}
                                {userToken ?
                                    <div className="
                                        absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200
                                        opacity-0 invisible translate-y-2
                                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                                        transition-all duration-200 z-[9999]
                                    ">
                                        <NavLink to="/profile" className="block px-4 py-3 text-sm hover:bg-gray-50 transition-all border-b border-gray-100">My Profile</NavLink>
                                        <NavLink to="/orders" className="block px-4 py-3 text-sm hover:bg-gray-50 transition-all border-b border-gray-100">My Orders</NavLink>
                                        <NavLink to="/wishlist" className="block px-4 py-3 text-sm hover:bg-gray-50 transition-all border-b border-gray-100">Wishlist</NavLink>
                                        <NavLink to="/cart" className="block px-4 py-3 text-sm hover:bg-gray-50 transition-all border-b border-gray-100">Cart</NavLink>
                                        <NavLink to="/addresses" className="block px-4 py-3 text-sm hover:bg-gray-50 transition-all border-b border-gray-100">Addresses</NavLink>
                                        <NavLink to="/support" className="block px-4 py-3 text-sm hover:bg-gray-50 transition-all border-b border-gray-100">Help</NavLink>
                                        <NavLink to="/logout" className="block px-4 py-3 text-sm hover:bg-red-50 text-red-600 font-semibold border-t border-gray-100" onClick={() => {localStorage.removeItem('userToken')}}>Logout</NavLink>
                                    </div>

                                    :

                                    <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 opacity-0 invisible translate-y-2
                                        group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 z-[9999]'>
                                        <NavLink to='/login' className="block px-4 py-3 text-sm hover:bg-gray-50 transition-all border-b border-gray-100">Create Account</NavLink>
                                        <NavLink to='/support' className="block px-4 py-3 text-sm hover:bg-gray-50 transition-all">Help & Support</NavLink>
                                    </div>
                                }
                            </div>

                            <Link to='/cart' className='relative p-1 hover:bg-gray-100 rounded-full transition-all'>
                                <img src={assets.cart_icon} className='w-5 h-5 cursor-pointer' alt="Cart" />
                                <span className='absolute -top-1 -right-1 w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm'>
                                    {getCartCount()}
                                </span>
                            </Link>

                            {/* Mobile menu button */}
                            <button
                                className='md:hidden p-1 hover:bg-gray-100 rounded-full transition-all'
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                <img src={assets.menu_icon} className='w-5 h-5' alt="Menu" />
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className='lg:hidden fixed top-[80px] left-0 right-0 bg-white/100 backdrop-blur-sm border-t border-gray-200 shadow-2xl z-[9999]'>
                    <div className='max-w-7xl mx-auto px-4 py-6'>
                        <div className='grid grid-cols-2 gap-6 text-sm'>
                            <div>
                                <NavLink to="/" onClick={() => setMobileOpen(false)} className='block py-3 font-semibold hover:text-blue-600 border-b border-gray-100'>Home</NavLink>
                                <NavLink to="/collection" onClick={() => setMobileOpen(false)} className='block py-3 hover:text-blue-600 border-b border-gray-100'>Collection</NavLink>
                            </div>
                            <div>
                                <NavLink to="/about" onClick={() => setMobileOpen(false)} className='block py-3 font-semibold hover:text-blue-600 border-b border-gray-100'>About</NavLink>
                                <NavLink to="/contact" onClick={() => setMobileOpen(false)} className='block py-3 hover:text-blue-600 border-b border-gray-100'>Contact</NavLink>
                            </div>
                        </div>
                        <div className='mt-6 pt-6 border-t border-gray-200'>
                            <div className='grid grid-cols-2 gap-6 text-sm'>
                                <div>
                                    <p className='font-semibold mb-3 text-xs uppercase tracking-wider text-gray-500'>Categories</p>
                                    <NavLink to="/categories/mens" onClick={() => setMobileOpen(false)} className='block py-2 hover:text-blue-600'>Mens</NavLink>
                                    <NavLink to="/categories/womens" onClick={() => setMobileOpen(false)} className='block py-2 hover:text-blue-600'>Womens</NavLink>
                                    <NavLink to="/categories/kids" onClick={() => setMobileOpen(false)} className='block py-2 hover:text-blue-600'>Kids</NavLink>
                                </div>
                                <div>
                                    <p className='font-semibold mb-3 text-xs uppercase tracking-wider text-gray-500'>Shop</p>
                                    <NavLink to="/shop/new-arrivals" onClick={() => setMobileOpen(false)} className='block py-2 hover:text-blue-600'>New Arrivals</NavLink>
                                    <NavLink to="/shop/best-offers" onClick={() => setMobileOpen(false)} className='block py-2 hover:text-blue-600'>Best Offers</NavLink>
                                    <NavLink to="/shop/sale" onClick={() => setMobileOpen(false)} className='block py-2 hover:text-blue-600'>Sale</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='h-[80px] md:h-[72px]'></div>
        </>
    );
};

export default Navbar;
