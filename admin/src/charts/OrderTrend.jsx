import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const monthlyRevenue = [
  { month: "Jan", revenue: 125000 },
  { month: "Feb", revenue: 142000 },
  { month: "Mar", revenue: 178000 },
  { month: "Apr", revenue: 161000 },
  { month: "May", revenue: 225000 },
  { month: "Jun", revenue: 278000 },
  { month: "Jul", revenue: 310000 },
  { month: "Aug", revenue: 295000 },
  { month: "Sep", revenue: 352000 },
  { month: "Oct", revenue: 405000 },
  { month: "Nov", revenue: 498000 },
  { month: "Dec", revenue: 620000 }
];

const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
const bestMonth = monthlyRevenue.reduce((a, b) => a.revenue > b.revenue ? a : b);

const data = {
  labels: monthlyRevenue.map((item) => item.month),
  datasets: [{
    label: "Revenue",
    data: monthlyRevenue.map((item) => item.revenue),
    backgroundColor: monthlyRevenue.map((item) =>
      item.month === bestMonth.month ? "#2563eb" : "#93c5fd"  // highlight best month
    ),
    hoverBackgroundColor: "#1d4ed8",
    borderRadius: 6,
    maxBarThickness: 22,
    categoryPercentage: 0.6,
    barPercentage: 0.9,
  }]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: "y",
  scales: {
    x: {
      grid: { color: '#f3f4f6' },
      border: { display: false },
      ticks: {
        color: '#9ca3af',
        font: { size: 11 },
        callback: (val) => `$${(val / 1000).toFixed(0)}k`  // $125k format
      }
    },
    y: {
      grid: { display: false },
      border: { display: false },
      ticks: {
        color: '#6b7280',
        font: { size: 12 },
      }
    },
  },
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
        label: (ctx) => `  Revenue: $${ctx.parsed.x.toLocaleString()}`
      }
    }
  }
};

const OrderTrend = () => {
  return (
    <div className='w-full bg-white border border-gray-200 hover:shadow-lg rounded-2xl p-5 hover:border-blue-300 transition-all duration-200'>


      <div className='flex items-center justify-between mb-1'>
        <h2 className='text-base font-semibold text-gray-800'>Monthly Revenue</h2>
        <span className='text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full'>2024</span>
      </div>
      <p className='text-xs text-gray-400 mb-4'>Full year breakdown by month</p>

   
      <div className='flex gap-3 mb-5'>
        <div className='bg-blue-50 rounded-xl px-3 py-2'>
          <p className='text-xs text-blue-400'>Total Revenue</p>
          <p className='text-sm font-semibold text-blue-700'>${(totalRevenue / 1000).toFixed(0)}k</p>
        </div>
        <div className='bg-blue-50 rounded-xl px-3 py-2'>
          <p className='text-xs text-blue-400'>Best Month</p>
          <p className='text-sm font-semibold text-blue-700'>{bestMonth.month} — ${(bestMonth.revenue / 1000).toFixed(0)}k</p>
        </div>
      </div>


      <div style={{ position: 'relative', height: '340px' }}>
        <Bar data={data} options={options} />
      </div>

    </div>
  )
}

export default OrderTrend