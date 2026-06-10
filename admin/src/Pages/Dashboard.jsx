import React from 'react';
import { Chart } from 'react-chartjs-2';
// import RevenueTrend from '../components/RevenueTrend';
import FirstLine from '../components/FirstLine';
import DashboardComponent from '../components/DashboardComponent';
import RevenueTrend from '../charts/RevenueTrend';
const Dashboard = () => {



  return (
    <div className=''>
      
        <div className='flex flex-col'>
          <FirstLine text = {"Dashboard"} />
          <DashboardComponent />
        
          <RevenueTrend />
        </div>




    </div>
  )
}

export default Dashboard ;