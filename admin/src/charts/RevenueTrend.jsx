import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJs.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const RevenueTrend = () => {
  const revenueData = [
    { month: "Jan", revenue: 185000 },
    { month: "Feb", revenue: 198000 },
    { month: "Mar", revenue: 215000 },
    { month: "Apr", revenue: 229000 },
    { month: "May", revenue: 241000 },
    { month: "Jun", revenue: 258000 },
    { month: "Jul", revenue: 272000 },
    { month: "Aug", revenue: 286000 },
    { month: "Sep", revenue: 279000 },
    { month: "Oct", revenue: 315000 },
    { month: "Nov", revenue: 348000 },
    { month: "Dec", revenue: 392000 },
  ];

  const chartData = {
    labels: revenueData.map(item => item.month),
    datasets: [
      {
        label: "Revenue",
        data: revenueData.map(item => item.revenue),
        borderColor: '#2563eb',
        backgroundColor: '#2563eb',
        tension: 0.4,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,  // Hide legend for cleaner look
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#2563eb',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',  // Gray-500
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        }
      },
      y: {
        grid: {
          color: '#e5e7eb',  // Light gray-200
          drawBorder: false,
          borderDash: [4, 4],
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          callback: function(value) {
            return '₹' + (value / 100000) + 'L';
          }
        },
        beginAtZero: true
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  // Calculate total revenue and growth
  const totalRevenue = revenueData.reduce((acc, item) => acc + item.revenue, 0);
  const growth = ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue * 100).toFixed(1);
// css needed to be fixed here
  return (
    <div className='bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200
    

    '>
      <div className='flex flex-row justify-between items-start mb-2'>
        <div>
          <h1 className='text-sm font-medium text-gray-500 mb-1'>Revenue Trend</h1>
          <h2 className='text-2xl font-bold text-gray-900'>₹{totalRevenue.toLocaleString()}</h2>
        </div>
        <div className='flex flex-col items-end'>
          <span className='text-sm font-semibold text-green-600'>+{growth}%</span>
          <span className='text-xs text-gray-400'>vs last year</span>
        </div>
      </div>
      
      <div className='max-h-80'>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

export default RevenueTrend