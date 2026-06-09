
import React from 'react'
import  {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

const RevenueTrend = () => {

     const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [125000, 148000, 172000, 161000, 215000, 248000],
        borderColor: "#3b82f6",
        tension: 0.4
      }
    ]
  };

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);



  return (
    <Line data = {data} />
  )
}

export default RevenueTrend