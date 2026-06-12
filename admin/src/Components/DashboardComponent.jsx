import React from 'react'
import { assets } from '../assets/assets';

const DashboardComponent = () => {

    // here data will be available with axios and use that
  const stats = [
    {
      title: "Revenue",
      value: "₹2.45L",
      change: "+18.4%",
      trend: "up",
      icon: assets.revenue || assets.dashboard,
    },
    {
      title: "Orders",
      value: "342",
      change: "+12.8%",
      trend: "up",
      icon: assets.orders,
    },
    {
      title: "Customers",
      value: "189",
      change: "+7.5%",
      trend: "up",
      icon: assets.customer,
    },
    {
      title: "Products",
      value: "124",
      change: "+6",
      trend: "up",
      icon: assets.order,
    },
  ];

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-6 px-1 py-6'>
      {stats.map((obj, index) => (
        <div 
          key={index} 
          className='bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group'
        >
          <div className='flex flex-col gap-3 max-h-28'>
      
            <div className='flex flex-row justify-between items-start'>
              <h1 className='text-sm font-medium text-gray-500 font-sans'>
                {obj.title}
              </h1>
              {obj.icon && (
                <img 
                  src={obj.icon} 
                  alt={obj.title} 
                  className='w-5 h-5 text-gray-400 group-hover:scale-110 transition-all duration-200'
                />
              )}
            </div>


            <h1 className='text-3xl font-bold text-gray-900 tracking-tight'>
              {obj.value}
            </h1>

            
            <div className='flex flex-row items-center gap-2'>
              <p className={`text-sm font-semibold ${
                obj.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {obj.change}
              </p>
              <img 
                src={obj.trend === "up" ? assets.up : assets.down} 
                alt={obj.trend} 
                className={`w-4 h-4 ${
                  obj.trend === 'up' ? 'text-green-600' : 'text-red-600'
                } group-hover:scale-110 transition-all duration-200`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardComponent