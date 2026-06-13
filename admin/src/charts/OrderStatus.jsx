import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJs.register(ArcElement, Tooltip, Legend);

const OrderStatus = () => {
  const orderStatus = [
    { status: "Delivered", value: 68, color: "#2563eb", bg: "bg-blue-50", text: "text-blue-700", light: "text-blue-400" },
    { status: "Shipped",   value: 17, color: "#10b981", bg: "bg-green-50", text: "text-green-700", light: "text-green-400" },
    { status: "Processing",value: 10, color: "#f59e0b", bg: "bg-yellow-50", text: "text-yellow-700", light: "text-yellow-400" },
    { status: "Cancelled", value: 5,  color: "#ef4444", bg: "bg-red-50", text: "text-red-700", light: "text-red-400" },
  ];

  const total = orderStatus.reduce((sum, item) => sum + item.value, 0);

  const dataForPieChart = {
    labels: orderStatus.map((item) => item.status),
    datasets: [{
      data: orderStatus.map((item) => item.value),
      backgroundColor: orderStatus.map((item) => item.color),
      borderWidth: 3,
      borderColor: '#fff',
      hoverOffset: 6,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',                                    
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#d1d5db',
        borderColor: '#3b82f6',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `  ${ctx.label}: ${ctx.parsed}%`
        }
      }
    }
  };

  return (
    <div className='w-full bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg rounded-2xl p-5 transition-all duration-200'>

      
      <div className='flex items-center justify-between mb-1'>
        <h2 className='text-base font-semibold text-gray-800'>Order Status</h2>
        <span className='text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full'>This Month</span>
      </div>
      <p className='text-xs text-gray-400 mb-5'>Distribution across {total} total orders</p>

      
      <div className='flex items-center gap-6'>


        <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
          <Doughnut data={dataForPieChart} options={options} />
          
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <p className='text-xl font-bold text-gray-800'>{total}</p>
            <p className='text-xs text-gray-400'>Orders</p>
          </div>
        </div>

        
        <div className='flex flex-col gap-2 flex-1'>
          {orderStatus.map((item) => (
            <div key={item.status} className={`flex items-center justify-between ${item.bg} rounded-xl px-3 py-2`}>
              <div className='flex items-center gap-2'>
                <span style={{ backgroundColor: item.color }} className='w-2 h-2 rounded-full inline-block'></span>
                <span className={`text-xs font-medium ${item.text}`}>{item.status}</span>
              </div>
              <span className={`text-xs font-semibold ${item.text}`}>{item.value}%</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default OrderStatus