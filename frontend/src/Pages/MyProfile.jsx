import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    address: '123 Winter Street, Agra, UP',
    joined: 'Dec 2024',
    orders: 12,
    wishlist: 8
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'orders', label: 'Orders', icon: 'package' },
    { id: 'wishlist', label: 'Wishlist', icon: 'heart' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  const handleSave = () => {
    setEditMode(false);
    // Save logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 bg-clip-text text-transparent mb-4">
            My Profile
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Manage your WinterX account, track orders, and update preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10 sticky top-8">
              {/* Profile Picture */}
              <div className="text-center mb-8">
                <div className="relative inline-block group">
                  <img 
                    src={assets.placeholder_profile || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"} 
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-3xl shadow-2xl border-4 border-white group-hover:scale-105 transition-all duration-300 mx-auto"
                  />
                  <button className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
                
                {editMode ? (
                  <input 
                    type="text" 
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className="mt-4 w-full px-4 py-3 text-2xl font-bold text-center bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                  />
                ) : (
                  <h2 className="mt-6 text-2xl lg:text-3xl font-bold text-slate-800">{userData.name}</h2>
                )}
                
                <p className="text-slate-500 mt-1">{userData.email}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-200/30">
                  <p className="text-2xl font-bold text-blue-700">{userData.orders}</p>
                  <p className="text-sm text-slate-600 font-medium">Total Orders</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-200/30">
                  <p className="text-2xl font-bold text-emerald-700">{userData.wishlist}</p>
                  <p className="text-sm text-slate-600 font-medium">Wishlist</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3 mb-8">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                  Edit Profile
                </button>
                <button className="w-full bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 py-3 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-slate-200">
                  Logout
                </button>
              </div>

              {/* Member Since */}
              <div className="text-center pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-500">Member since</p>
                <p className="text-lg font-semibold text-slate-800">{userData.joined}</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Tabs */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10 mb-8">
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-6 -mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 group ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/25 scale-105'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:shadow-lg border border-slate-200/50'
                    }`}
                  >
                    <span className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      {tab.icon === 'user' && '👤'}
                      {tab.icon === 'package' && '📦'}
                      {tab.icon === 'heart' && '❤️'}
                      {tab.icon === 'settings' && '⚙️'}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'profile' && (
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10">
                  <div className="flex justify-between items-start mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Profile Information</h2>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      {editMode ? 'Save Changes' : 'Edit Profile'}
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Full Name</label>
                      {editMode ? (
                        <input type="text" value={userData.name} className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      ) : (
                        <p className="text-xl font-semibold text-slate-800 p-4 bg-slate-50/50 rounded-2xl">{userData.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Email</label>
                      <p className="text-xl font-semibold text-slate-800 p-4 bg-slate-50/50 rounded-2xl">{userData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Phone</label>
                      {editMode ? (
                        <input type="tel" value={userData.phone} className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      ) : (
                        <p className="text-xl font-semibold text-slate-800 p-4 bg-slate-50/50 rounded-2xl">{userData.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Address</label>
                      {editMode ? (
                        <textarea value={userData.address} className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical" rows="3" />
                      ) : (
                        <p className="text-xl font-semibold text-slate-800 p-4 bg-slate-50/50 rounded-2xl">{userData.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10">
                  <h2 className="text-3xl font-bold text-slate-800 mb-8">Your Orders</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Order cards */}
                    <div className="group p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="font-semibold text-emerald-800">Delivered</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-800 mb-2">#ORD123</p>
                      <p className="text-sm text-slate-600 mb-4">Cozy Winter Coat</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-800">₹2,499</span>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">View</span>
                      </div>
                    </div>
                    {/* Repeat for more orders */}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10">
                  <h2 className="text-3xl font-bold text-slate-800 mb-8">Wishlist</h2>
                  <p className="text-slate-600 text-lg">Your saved winter favorites will appear here</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10">
                  <h2 className="text-3xl font-bold text-slate-800 mb-8">Account Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-slate-700 mb-4">Language</label>
                      <select className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>English</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-slate-700 mb-4">Theme</label>
                      <div className="flex gap-3">
                        <button className="flex-1 p-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl font-semibold hover:shadow-lg transition-all">Light</button>
                        <button className="flex-1 p-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl font-semibold hover:shadow-lg transition-all">Dark</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
