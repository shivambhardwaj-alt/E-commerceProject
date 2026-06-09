import React from 'react';
import { Chart } from 'react-chartjs-2';
import RevenueTrend from '../components/RevenueTrend';
const Dashboard = () => {



  return (
    <div>
        <div className='w-full h-[400px]'>
        
        <RevenueTrend />
        </div>




    </div>
  )
}

export default Dashboard ;