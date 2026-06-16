import React, { useState, useEffect, useReducer, useMemo } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { assets } from '../assets/assets';
import Filter from '../components/Filter';
import { useMatch } from 'react-router-dom';

const statusColors = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
  Returned: 'bg-purple-100 text-purple-700',
}

const Order = () => {

  const dummyOrderdata = [
    { orderId: "ORD1001", customerName: "Rahul Sharma", product: "Wireless Mouse", quantity: 2, price: 799, status: "Delivered", orderDate: "2026-06-01" },
    { orderId: "ORD1002", customerName: "Priya Singh", product: "Bluetooth Headphones", quantity: 1, price: 2499, status: "Delivered", orderDate: "2026-06-01" },
    { orderId: "ORD1003", customerName: "Aman Verma", product: "Mechanical Keyboard", quantity: 1, price: 3499, status: "Shipped", orderDate: "2026-06-02" },
    { orderId: "ORD1004", customerName: "Neha Gupta", product: "Laptop Stand", quantity: 1, price: 1199, status: "Delivered", orderDate: "2026-06-02" },
    { orderId: "ORD1005", customerName: "Arjun Kumar", product: "USB-C Hub", quantity: 2, price: 1499, status: "Processing", orderDate: "2026-06-03" },
    { orderId: "ORD1006", customerName: "Sneha Patel", product: "Smart Watch", quantity: 1, price: 5999, status: "Delivered", orderDate: "2026-06-03" },
    { orderId: "ORD1007", customerName: "Karan Mehta", product: "Gaming Mouse Pad", quantity: 3, price: 699, status: "Delivered", orderDate: "2026-06-04" },
    { orderId: "ORD1008", customerName: "Pooja Yadav", product: "External SSD 1TB", quantity: 1, price: 7499, status: "Shipped", orderDate: "2026-06-04" },
    { orderId: "ORD1009", customerName: "Rohit Jain", product: "Monitor 24-inch", quantity: 1, price: 12999, status: "Delivered", orderDate: "2026-06-05" },
    { orderId: "ORD1010", customerName: "Simran Kaur", product: "Webcam HD", quantity: 1, price: 1999, status: "Cancelled", orderDate: "2026-06-05" },
    { orderId: "ORD1011", customerName: "Vivek Mishra", product: "Power Bank 20000mAh", quantity: 2, price: 1899, status: "Delivered", orderDate: "2026-06-06" },
    { orderId: "ORD1012", customerName: "Anjali Roy", product: "Tablet", quantity: 1, price: 18999, status: "Processing", orderDate: "2026-06-06" },
    { orderId: "ORD1013", customerName: "Deepak Sharma", product: "Gaming Chair", quantity: 1, price: 9999, status: "Shipped", orderDate: "2026-06-07" },
    { orderId: "ORD1014", customerName: "Riya Kapoor", product: "Desk Lamp", quantity: 2, price: 899, status: "Delivered", orderDate: "2026-06-07" },
    { orderId: "ORD1015", customerName: "Mohit Arora", product: "Noise Cancelling Earbuds", quantity: 1, price: 3999, status: "Returned", orderDate: "2026-06-08" },
    { orderId: "ORD1016", customerName: "Kavya Nair", product: "Smartphone", quantity: 1, price: 24999, status: "Delivered", orderDate: "2026-06-08" },
    { orderId: "ORD1017", customerName: "Harsh Gupta", product: "Ethernet Cable", quantity: 5, price: 299, status: "Delivered", orderDate: "2026-06-09" },
    { orderId: "ORD1018", customerName: "Nitin Agarwal", product: "Graphics Tablet", quantity: 1, price: 5499, status: "Processing", orderDate: "2026-06-09" },
    { orderId: "ORD1019", customerName: "Tanya Bhatia", product: "Portable Speaker", quantity: 1, price: 2999, status: "Shipped", orderDate: "2026-06-10" },
    { orderId: "ORD1020", customerName: "Aditya Saxena", product: "Laptop Backpack", quantity: 2, price: 1599, status: "Delivered", orderDate: "2026-06-10" },
  ];





  // ====================== LOGIC FOR THE FILTERS ====================================
  const initialState = {
    search : '',
    startDate : null ,
    endDate :null,
    status : null,
    sortBy : null,
    isFocused : false,
    
  }
  const filterReducer =(state,action) => {

    switch(action.type){
      case  "SET_SEARCH": return {...state, search: action.payload}
      case "SET_START_DATE" : return {...state,startDate:action.payload}
      case "SET_END_DATE" : return {...state,endDate:action.payload}
      case "SET_STATUS" : return {...state,status: action.payload}
      case "SET_SORT" : return {...state, sortBy : action.payload}
      case "RESET" : return  initialState
      default : return state
    }
  }

    const [state, dispatch] = useReducer(filterReducer, initialState);

  



  const filteredOrder = useMemo(() => {
    
    let result = [...dummyOrderdata];
    if (state.search.trim()) {
  const query = state.search.toLowerCase();
  let temp = [];
  result.forEach(element => {
    for (let key in element) {
      if (typeof element[key] === 'string' && element[key].toLowerCase().includes(query)) {
        temp.push(element);
        break;
      }
    }
  });
  result = temp;
}



 if (state.startDate) {
    result = result.filter(o => new Date(o.orderDate) >= new Date(state.startDate));
  }
  if (state.endDate) {
    result = result.filter(o => new Date(o.orderDate) <= new Date(state.endDate));
  }

  if (state.status) {
    result = result.filter(o => o.status === state.status);
  }

   if (state.sortBy === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
  }

  return result;

  },[state.search ,state.startDate, state.endDate, state.status, state.sortBy]);










  return (
    <div className='p-4 bg-gray-50 min-h-screen'>

      {/* Header */}
      <div className='flex flex-col gap-1 mb-5'>
        <h1 className='text-2xl font-semibold text-gray-800'>Orders</h1>
        <p className='text-sm text-gray-400'>Track order activity, fulfillment status, and recent transactions</p>
      </div>

      {/* Filter Bar */}
      <div className='bg-white rounded-xl border border-gray-200 p-3 mb-4'>
        <Filter
         filterState  = {state}
         dispatch  = {dispatch}
        />
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5'>
        {[
          { label: 'Total Orders', value: filteredOrder.length, color: 'text-gray-800' },
          { label: 'Delivered', value: filteredOrder.filter(o => o.status === 'Delivered').length, color: 'text-green-600' },
          { label: 'Pending', value: filteredOrder.filter(o => ['Shipped', 'Processing'].includes(o.status)).length, color: 'text-yellow-600' },
          { label: 'Cancelled', value: filteredOrder.filter(o => o.status === 'Cancelled').length, color: 'text-red-500' },
        ].map((card) => (
          <div key={card.label} className='bg-white rounded-xl border border-gray-200 px-4 py-3'>
            <p className='text-xs text-gray-400 mb-1'>{card.label}</p>
            <p className={`text-2xl font-semibold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
        <div className='w-full overflow-x-auto'>
          <table className='w-full min-w-[750px] text-sm'>

            <thead>
              <tr className='bg-gray-50 border-b border-gray-200'>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Order ID</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Customer</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Product</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Qty</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Price</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Status</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Date</th>
                <th className='px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-100'>
              {filteredOrder.map((item, index) => (
                <tr key={item.orderId} className='hover:bg-gray-50 transition-colors duration-150'>
                  <td className='px-4 py-3 text-xs font-semibold text-gray-500'>{item.orderId}</td>
                  <td className='px-4 py-3 text-xs font-medium text-gray-500'>{item.customerName}</td>
                  <td className='px-4 py-3 text-xs text-gray-500'>{item.product}</td>
                  <td className='px-4 py-3 text-xs text-gray-500'>{item.quantity}</td>
                  <td className='px-4 py-3 text-xs font-medium text-gray-500'>₹{item.price.toLocaleString()}</td>
                  <td className='px-4 py-3'>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-400'>{item.orderDate}</td>
                  <td className='px-4 py-3'>
                    <div className='flex flex-row gap-3'>
                      <img src={assets.del} alt="delete" className='w-4 h-4 cursor-pointer opacity-40 hover:opacity-100 transition-opacity' />
                      <img src={assets.more} alt="more" className='w-4 h-4 cursor-pointer opacity-40 hover:opacity-100 transition-opacity' />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Footer */}
        <div className='px-4 py-3 border-t border-gray-100 bg-gray-50 flex flex-row items-center justify-between'>
          <p className='text-xs text-gray-400'>Showing {dummyOrderdata.length} orders</p>

          <div className='flex items-center justify-between w-full max-w-50 text-gray-400 font-normal'>
            <button type="button" aria-label="prev" className='cursor-pointer transition-all hover:scale-105 duration-300'>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" stroke-width=".078" />
              </svg>
            </button>
              <span className='text-xs font-black'>Page 1 out of 100</span>
            <button type="button" aria-label="next" className='transition-all hover:scale-105 duration-300 cursor-pointer'>
              <svg class="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" stroke-width=".078" />
              </svg>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Order;