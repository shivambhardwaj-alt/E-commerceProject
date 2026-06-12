import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJs.register(
  ArcElement,
  Tooltip,
  Legend,
);

const OrderStatus = () => {
  const orderStatus = [
    { status: "Delivered", value: 68 },
    { status: "Shipped", value: 17 },
    { status: "Processing", value: 10 },
    { status: "Cancelled", value: 5 },
  ];

  const dataForPieChart = {
    labels: orderStatus.map((item) => item.status),
    datasets: [
      {
        data: orderStatus.map((item) => item.value),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
        borderWidth: 2,
        borderColor: '#fff',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {  // Fixed: wrapped legend and tooltip inside plugins
      legend: {  // Fixed: added 'legend' key
        display: true,
        position: 'right',
        labels: {
          padding: 15,
          font: {
            size: 14,
          }
        }
      },
      tooltip: {  // Fixed: moved tooltip inside plugins
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed} orders`;
          }
        }
      }
    }
  };

  return (
    <div className='bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 h-[400px] w-full'>
      <h1 className='text-xl font-bold text-gray-900 mb-4'>Order Status</h1>
      <Doughnut data={dataForPieChart} options={options} />
    </div>
  )
}

export default OrderStatus