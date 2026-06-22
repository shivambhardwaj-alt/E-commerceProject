import React, { useState } from 'react';
import { assets } from '../assets/assets';

const ManageAddress = () => {
  const addresses = [
    {
      id: 1,
      name: "Shivam Bhardwaj",
      phone: "9876543210",
      addressLine1: "123 Green Park",
      addressLine2: "Near City Mall",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      country: "India",
      type: "Home",
    },
    {
      id: 2,
      name: "Shivam Bhardwaj",
      phone: "9876543211",
      addressLine1: "45 MG Road",
      addressLine2: "Sector 18",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122001",
      country: "India",
      type: "Work",
    },
    {
      id: 3,
      name: "Shivam Bhardwaj",
      phone: "9876543212",
      addressLine1: "78 Residency Road",
      addressLine2: "Near Metro Station",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      country: "India",
      type: "Home",
    },
  ];

  const [openForm, setOpenForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Helper function to format address beautifully
  const formatAddress = (addr) => {
    return `${addr.addressLine1}, ${addr.addressLine2}, ${addr.city}, ${addr.state} - ${addr.pincode}, ${addr.country}`;
  };

  // Get type badge color
  const getTypeBadgeClass = (type) => {
    return type === 'Home' 
      ? 'bg-blue-100 text-blue-800' 
      : type === 'Work' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-gray-100 text-gray-800';
  };

  // Handle edit click
  const handleEdit = (address) => {
    setSelectedAddress(address);
    setEditingId(address.id);
    setOpenForm(true);
  };

  // Handle delete click
  const handleDelete = (id) => {
    // In real app, add confirmation and API call
    console.log('Delete address with id:', id);
  };

  // Handle add new
  const handleAddNew = () => {
    setSelectedAddress(null);
    setEditingId(null);
    setOpenForm(true);
  };

  // Handle close form
  const handleCloseForm = () => {
    setOpenForm(false);
    setSelectedAddress(null);
    setEditingId(null);
  };

  return (
    <div className='w-full flex flex-col flex-grow bg-white'>
      {/* Header */}
      <div className='md:p-6 p-4 border-b border-gray-200'>
        <h1 className='text-2xl font-bold text-gray-900'>Manage Address</h1>
        <p className='text-sm text-gray-600 mt-1'>Add, edit, or remove your delivery addresses</p>
      </div>

      {/* Add New Address Button */}
      <div className='flex items-center justify-start md:gap-4 md:p-6 p-4 border-b border-gray-200'>
        <button
          onClick={handleAddNew}
          className='flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm'
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          <span className='font-medium'>Add a new Address</span>
        </button>
      </div>

      {/* Recent Addresses List */}
      <div className='flex flex-col gap-3 md:p-6 p-4 flex-grow'>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold text-gray-900'>Recent Addresses</p>
          <p className='text-sm text-gray-500'>{addresses.length} addresses</p>
        </div>

        {addresses.length === 0 ? (
          <div className='text-center py-12 bg-gray-50 rounded-lg border border-gray-200'>
            <p className='text-gray-500'>No addresses added yet</p>
            <button
              onClick={handleAddNew}
              className='mt-3 text-blue-600 hover:text-blue-700 font-medium'
            >
              Add your first address
            </button>
          </div>
        ) : (
          addresses.map((item) => (
            <div 
              key={item.id}
              className={`border border-gray-200 md:p-4 md:px-5 md:mb-3 p-3 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all ${
                editingId === item.id ? 'border-blue-500 bg-blue-50' : ''
              }`}
            >
              <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                {/* Address Info */}
                <div className='flex flex-row items-start md:items-center gap-4'>
                  {/* Type Badge */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeClass(item.type)}`}>
                    {item.type}
                  </span>
                  
                  <div className='flex flex-col'>
                    <p className='font-medium text-gray-900'>{item.name}</p>
                    <p className='text-sm text-gray-600'>{item.phone}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex items-center gap-2'>
                  <button
                    onClick={() => handleEdit(item)}
                    className='px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors'
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Full Address */}
              <p className='text-xs text-gray-600 mt-3 leading-relaxed'>
                {formatAddress(item)}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Address Form Modal */}
      {openForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-lg p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-xl font-bold text-gray-900'>
                {editingId ? 'Edit Address' : 'Add New Address'}
              </h2>
              <button
                onClick={handleCloseForm}
                className='text-gray-500 hover:text-gray-700'
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

          
            <div className='space-y-4'>
              <input
                type="text"
                placeholder="Full Name"
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                defaultValue={selectedAddress?.name || ''}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                defaultValue={selectedAddress?.phone || ''}
              />
              <input
                type="text"
                placeholder="Address Line 1"
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                defaultValue={selectedAddress?.addressLine1 || ''}
              />
              <input
                type="text"
                placeholder="Address Line 2"
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                defaultValue={selectedAddress?.addressLine2 || ''}
              />
              <div className='grid grid-cols-2 gap-3'>
                <input
                  type="text"
                  placeholder="City"
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  defaultValue={selectedAddress?.city || ''}
                />
                <input
                  type="text"
                  placeholder="State"
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  defaultValue={selectedAddress?.state || ''}
                />
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <input
                  type="text"
                  placeholder="Pincode"
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  defaultValue={selectedAddress?.pincode || ''}
                />
                <select
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  defaultValue={selectedAddress?.type || 'Home'}
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className='flex gap-3 mt-6'>
              <button
                onClick={handleCloseForm}
                className='w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
              >
                Cancel
              </button>
              <button
                className='w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
              >
                {editingId ? 'Update Address' : 'Save Address'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAddress;