import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { Bell  ,Menu } from 'lucide-react';
import MobileProfileSidebar from './MobileProfileSidebar';

const MyProfileSidebar = () => {
  const [isMobileScreen, setMobileScreen] = useState(window.innerWidth < 768);
  const[showMenu ,setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreen = () => {
      setMobileScreen(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('userToken');
  };

  return (
    <>
      {!isMobileScreen && (
        <div className="hidden md:block max-w-[150px] md:min-w-[280px] max-h-full mt-1 md:mt-2 md:p-2 p-1 md:px-2">
          <div className="flex md:flex-row flex-col md:items-center md:justify-start gap-4 justify-evenly md:px-5 bg-white border border-[#DCE8F2] rounded-md p-4 mt-2">
            <div className="w-9 h-9 rounded-full bg-[#DCE8F2] overflow-hidden shrink-0">
              <img
                src={assets.profile_icon}
                alt="shivam"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-row items-start justify-center gap-1 text-[#16273D]">
              <p className="font-semibold text-2xl">Hello</p>
              <h1 className="text-[#16273D] font-semibold text-2xl tracking-wide">
                Shivam
              </h1>
            </div>
          </div>

          <div className="flex md:flex-row flex-col items-center justify-center md:justify-start mt-8">
            <div
              className="flex flex-row items-center md:justify-start font-medium text-[#16273D] text-base md:text-lg p-1 md:pl-4 md:gap-3 gap-2 prata-regular cursor-pointer transition-colors duration-150 hover:text-[#D9683A]"
              onClick={() => navigate('/orders')}
            >
              <img src={assets.order} alt="order-img" className="w-5 h-5 opacity-70" />
              <h1 className="tracking-wide">ORDERS</h1>
            </div>
          </div>

          <hr className="border-t border-[#DCE8F2] w-full my-5" />

          <div className="bg-white border border-[#DCE8F2] rounded-md">
            <div className="flex flex-col items-start justify-center md:pl-4 pl-1 py-4">
              <div className="flex flex-row gap-2 items-center">
                <img src={assets.user} alt="" className="w-6 h-6 opacity-70" />
                <h1 className="text-lg font-medium text-[#16273D]">Account Settings</h1>
              </div>

              <div className="flex flex-col justify-center items-start p-1 md:p-2 text-sm md:pl-10 pl-2 gap-2 mt-1">
                <h1
                  className="text-[#222831] transition-colors duration-150 hover:text-[#D9683A] cursor-pointer font-medium"
                  onClick={() => navigate('personal-info')}
                >
                  Personal Information
                </h1>
                <h1
                  className="text-[#222831] transition-colors duration-150 hover:text-[#D9683A] cursor-pointer font-medium"
                  onClick={() => navigate('manage-Address')}
                >
                  Manage Address
                </h1>
              </div>

              <hr className="border-t border-[#DCE8F2] w-full my-4" />

              <div className="flex flex-row items-center justify-center gap-2">
                <img src={assets.payment} alt="" className="w-6 h-6 opacity-70" />
                <h1 className="text-lg font-medium text-[#16273D]">Payments</h1>
              </div>

              <div className="flex flex-col justify-center items-start p-1 md:p-2 text-sm md:pl-10 pl-2 gap-2 mt-1">
                <h1 className="text-[#222831] transition-colors duration-150 hover:text-[#D9683A] cursor-pointer font-medium">Gift Cards</h1>
                <h1 className="text-[#222831] transition-colors duration-150 hover:text-[#D9683A] cursor-pointer font-medium">Coupons</h1>
                <h1 className="text-[#222831] transition-colors duration-150 hover:text-[#D9683A] cursor-pointer font-medium">Invoices</h1>
              </div>

              <div className="flex flex-row items-center justify-start gap-2 mt-4">
                <Bell />
                <h1 className="text-[#222831] transition-colors duration-150 hover:text-[#D9683A] cursor-pointer font-medium">
                  Notifications
                </h1>
              </div>
            </div>

            <hr className="border-[#DCE8F2]" />

            <div className="flex flex-row items-center justify-start p-4">
              <button
                className="border border-[#D9683A] text-[#D9683A] text-sm font-medium rounded-md px-4 py-2 transition-colors duration-150 hover:bg-[#D9683A] hover:text-white"
                onClick={handleLogoutClick}
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>
      )}

      { isMobileScreen && 
        <div className='flex flex-row items-center justify-end mt-5'>
            <Menu className='w-10 cursor-pointer transition-all duration-200 hover:scale-105 fixed' onClick={() => setShowMenu(!showMenu)}/>
                {
                    showMenu && <MobileProfileSidebar  showMenu={showMenu} setShowMenu={setShowMenu}  />
                }
        </div>
      }
    </>
  );
};

export default MyProfileSidebar;