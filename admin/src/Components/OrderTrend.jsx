import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import {Line} from 'react-chartjs-2';
const OrderTrend = () => {
const ordersData = [
  { month: "Jan", orders: 520 },
  { month: "Feb", orders: 610 },
  { month: "Mar", orders: 735 },
  { month: "Apr", orders: 690 },
  { month: "May", orders: 880 },
  { month: "Jun", orders: 1020 }
];



  return (
    <div>OrderTrend</div>
  )
}

export default OrderTrend