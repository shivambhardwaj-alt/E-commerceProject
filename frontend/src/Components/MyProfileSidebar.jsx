import {React,useState} from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const MyProfileSidebar = () => {

    const handleLogoutClick = () => {
        localStorage.removeItem('userToken');

    }

    const [isMobileScreen, setMobileScreen] = useState(false);

    const navigate = useNavigate();






    return (
        <div className='hidden md:block max-w-[150px]  md:min-w-[280px]  max-h-full  mt-1 md:mt-2 md:p-2 p-1 md:px-4 '>
            <div className='flex md:flex-row flex-col md:items-center md:justify-start  gap-4 justify-evenly md:px-5 bg-white shadow-lg rounded-md p-4 mt-2'>
                <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden shrink-0  ">
                    <img src={assets.profile_icon} alt={"shivam"} className="w-full h-full object-cover" />

                </div>

                <h1 className='text-lg text-gray-600 font-semibold prata-regular'>{"Shivam"}</h1>
            </div>
            <div className='flex md:flex-row flex-col items-center justify-center md:justify-start mt-10'>
                <div className='flex flex-row items-center md:justify-start  font-bold text-gray-700 text-lg md:text-xl p-1 md:pl-4 md:gap-2 gap-1 prata-regular cursor-pointer'>
                    <img src={assets.order} alt="order-img" className='w-5 h-5' />
                    <h1>ORDERS</h1>
                </div>
            </div>
            <hr className="border-t border-gray-300 w-full my-4" />
            {/* REST OF THE SIDEBAR */}
            <div className='bg-white shadow-lg rounded-sm '>
                <div className='flex flex-col items-start justify-center md:pl-4 pl-1 '>
                    <div className='flex flex-row gap-2'>
                        <img src={assets.user} alt="" className='w-8 h-8 mb-1' />
                        <h1 className='text-xl font-medium prata-regular'>Account Settings</h1>
                    </div>
                    <div className='flex flex-col justify-center items-start p-1 md:p-2 text-sm md:pl-12 pl-2 gap-1 '>
                        <h1 className='text-gray-600 underline transition-all duration-200  hover:text-gray-900     hover:scale-105 cursor-pointer font-medium' onClick={() => navigate('personal-info')}>Personal Information</h1>
                        <h1 className='text-gray-600 underline transition-all duration-200  hover:text-gray-900     hover:scale-105 cursor-pointer font-medium' onClick={() => navigate('manage-Address')}>Manage Address</h1>
                    </div>
                    <hr className="border-t border-gray-300 w-full my-2" />
                    <div className='flex flex-row items-center justify-center p-1 gap-2 mb-2'>
                        <img src={assets.payment} alt="" className='w-8 h-8' />
                        <h1 className='text-xl font-medium prata-regular'>Payments</h1>
                    </div>
                    <div className='flex flex-col justify-center items-start p-1 md:p-2 text-sm md:pl-12 pl-2 gap-1'>
                        <h1 className='text-gray-600 underline transition-all duration-200  hover:text-gray-900     hover:scale-105 cursor-pointer font-medium'>Gift Cards</h1>
                        <h1 className='text-gray-600 underline transition-all duration-200  hover:text-gray-900     hover:scale-105 cursor-pointer font-medium'>Coupons</h1>
                        <h1 className='text-gray-600 underline transition-all duration-200  hover:text-gray-900     hover:scale-105 cursor-pointer font-medium'>Invoices</h1>
                    </div>

                </div>
                <hr className='border-gray-300' />
                <div className='flex flex-row items-center justify-start p-3 '>
                    <button className='bg-red-400 rounded-xl px-3 py-2 transition-all duration-200 hover:scale-105 hover:bg-red-700 text-white' onClick={() => handleLogoutClick()}>LOGOUT</button>
                </div>
            </div>

        </div>
    )
}

export default MyProfileSidebar