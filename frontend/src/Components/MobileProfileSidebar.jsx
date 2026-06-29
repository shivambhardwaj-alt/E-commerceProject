import React from 'react';
import {
  X,
  UserRound,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  BadgePercent,
  ReceiptText,
  Gift,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileProfileSidebar = ({ showMenu, setShowMenu }) => {
  const closeMenu = () => setShowMenu(false);

  const itemClass =
    'flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-gray-700 transition-all duration-200 hover:bg-orange-50 hover:text-[#D9683A]';

  return (
    <div
      className={`fixed top-[60px] right-0 z-50 h-[calc(100vh-60px)] w-full bg-black/40 backdrop-blur-[2px] transform transition-transform duration-300 ease-in-out will-change-transform ${
        showMenu ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="ml-auto h-full w-[100%] max-w-full bg-white shadow-2xl border-l border-gray-100 overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">My Account</h1>
            <p className="text-xs text-gray-500">Manage your profile settings</p>
          </div>

          <button
            onClick={closeMenu}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-5 rounded-2xl bg-gradient-to-r from-[#fff7f2] to-[#fff] p-4 border border-orange-100">
            <p className="text-sm text-gray-500">Welcome back</p>
            <h2 className="mt-1 text-2xl font-semibold text-gray-900">Shivam</h2>
          </div>

          <div className="space-y-2">
            <p className="px-1 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Account Settings
            </p>
            <Link to="personal-info" onClick={closeMenu} className={itemClass}>
              <UserRound size={18} />
              <span>Personal Information</span>
            </Link>
            <Link to="manage-address" onClick={closeMenu} className={itemClass}>
              <MapPin size={18} />
              <span>Manage Address</span>
            </Link>
          </div>

          <div className="my-5 border-t border-gray-100" />

          <div className="space-y-2">
            <p className="px-1 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Payments
            </p>
            <Link to="#" className={itemClass}>
              <Gift size={18} />
              <span>Gift Cards</span>
            </Link>
            <Link to="#" className={itemClass}>
              <BadgePercent size={18} />
              <span>Coupons</span>
            </Link>
            <Link to="#" className={itemClass}>
              <ReceiptText size={18} />
              <span>Invoices</span>
            </Link>
          </div>

          <div className="my-5 border-t border-gray-100" />

          <button className={itemClass + ' w-full'}>
            <Bell size={18} />
            <span>Notifications</span>
          </button>

          <div className="my-5 border-t border-gray-100" />

          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-red-600 transition-all duration-200 hover:bg-red-50"
            onClick={() => {
              localStorage.removeItem('userToken');
              closeMenu();
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileProfileSidebar;