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

const topProducts = [
  { product: "Oversized T-Shirt", sales: 842 },
  { product: "Black Hoodie", sales: 691 },
  { product: "Cargo Pants", sales: 612 },
  { product: "Blue Denim", sales: 541 },
  { product: "White Sneakers", sales: 482 },
  { product: "Puffer Jacket", sales: 437 },
  { product: "Jogger Pants", sales: 398 },
  { product: "Striped Polo", sales: 364 },
  { product: "Wool Sweater", sales: 319 },
];

const TopProducts = () => {

  const data = {
    labels: topProducts.map((item) => item.product),
    datasets: [{
      label: "Sales",
      data: topProducts.map((item) => item.sales),
      backgroundColor: "#3b82f6",
      hoverBackgroundColor: "#2563eb",
      borderRadius: 6,
      maxBarThickness: 28,
      categoryPercentage: 0.5,
      barPercentage: 0.9,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x",
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: '#9ca3af',
          font: { size: 11 },
          maxRotation: 30,    // angled labels so they don't overlap
          minRotation: 30,
        }
      },
      y: {
        grid: { color: '#f3f4f6' },  // subtle grid lines
        border: { display: false },
        ticks: {
          color: '#9ca3af',
          font: { size: 11 },
          callback: (val) => `${val}`
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
          label: (ctx) => `  ${ctx.parsed.y} units sold`
        }
      }
    }
  };

  return (
    <div className='w-full border border-gray-200 hover:shadow-lg rounded-2xl p-5 hover:border-blue-300 transition-all duration-200 bg-white'>
      

      <div className='flex items-center justify-between mb-1'>
        <h2 className='text-base font-semibold text-gray-800'>Top Products</h2>
        <span className='text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full'>By Units Sold</span>
      </div>
      <p className='text-xs text-gray-400 mb-4'>Showing top 9 products this season</p>

     
      <div style={{ position: 'relative', height: '280px' }}>
        <Bar data={data} options={options} />
      </div>

    </div>
  )
}

export default TopProducts