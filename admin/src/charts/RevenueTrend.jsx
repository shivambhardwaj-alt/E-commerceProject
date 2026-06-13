import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJs, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from 'chart.js';

ChartJs.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

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

  const totalRevenue = revenueData.reduce((acc, item) => acc + item.revenue, 0);
  const growth = ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue * 100).toFixed(1);
  const bestMonth = revenueData.reduce((a, b) => a.revenue > b.revenue ? a : b);
  const avgRevenue = Math.round(totalRevenue / revenueData.length);

  const chartData = {
    labels: revenueData.map(item => item.month),
    datasets: [{
      label: "Revenue",
      data: revenueData.map(item => item.revenue),
      borderColor: '#2563eb',
      backgroundColor: (ctx) => {                     
        const canvas = ctx.chart.ctx;
        const gradient = canvas.createLinearGradient(0, 0, 0, 260);
        gradient.addColorStop(0, 'rgba(37,99,235,0.15)');
        gradient.addColorStop(1, 'rgba(37,99,235,0)');
        return gradient;
      },
      tension: 0.4,
      fill: true,                                     
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#fff',
        bodyColor: '#d1d5db',
        borderColor: '#2563eb',
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (ctx) => `  ₹${ctx.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: '#9ca3af',
          font: { size: 11 }
        }
      },
      y: {
        grid: { color: '#f3f4f6' },
        border: { display: false },
        ticks: {
          color: '#9ca3af',
          font: { size: 11 },
          callback: (val) => `₹${(val / 100000).toFixed(1)}L`
        },
        beginAtZero: false                            
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className='w-full bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg rounded-2xl p-5 transition-all duration-200'>

      
      <div className='flex items-center justify-between mb-1'>
        <h2 className='text-base font-semibold text-gray-800'>Revenue Trend</h2>
        <span className='text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full'>2024</span>
      </div>
      <p className='text-xs text-gray-400 mb-4'>Monthly revenue across the year</p>

      
      <div className='flex gap-3 mb-5'>
        <div className='bg-blue-50 rounded-xl px-3 py-2'>
          <p className='text-xs text-blue-400'>Total Revenue</p>
          <p className='text-sm font-semibold text-blue-700'>₹{(totalRevenue / 100000).toFixed(1)}L</p>
        </div>
        <div className='bg-green-50 rounded-xl px-3 py-2'>
          <p className='text-xs text-green-400'>Growth</p>
          <p className='text-sm font-semibold text-green-700'>+{growth}%</p>
        </div>
        <div className='bg-blue-50 rounded-xl px-3 py-2'>
          <p className='text-xs text-blue-400'>Best Month</p>
          <p className='text-sm font-semibold text-blue-700'>{bestMonth.month} — ₹{(bestMonth.revenue / 100000).toFixed(1)}L</p>
        </div>
        <div className='bg-blue-50 rounded-xl px-3 py-2'>
          <p className='text-xs text-blue-400'>Monthly Avg</p>
          <p className='text-sm font-semibold text-blue-700'>₹{(avgRevenue / 100000).toFixed(1)}L</p>
        </div>
      </div>

 
      <div style={{ position: 'relative', height: '260px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>

    </div>
  )
}

export default RevenueTrend