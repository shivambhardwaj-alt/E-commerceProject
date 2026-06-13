import React from 'react';
import { Chart } from 'react-chartjs-2';
// import RevenueTrend from '../components/RevenueTrend';
import FirstLine from '../components/FirstLine';
import DashboardComponent from '../components/DashboardComponent';
import RevenueTrend from '../charts/RevenueTrend';
import OrderStatus from '../charts/OrderStatus';
import OrderTrend from '../charts/OrderTrend';
import TopProducts from '../charts/TopProducts';
const Dashboard = () => {



  return (
    <div className=''>

      <div className='flex flex-col gap-3 sm:px-5'>
        <FirstLine text={"Dashboard"} />

        <DashboardComponent />
        <div className='hidden sm:flex flex-col'>
          <RevenueTrend />
          <div className='flex md:flex-row flex-col mt-10 gap-2'>
               <OrderTrend />
            <OrderStatus />
         
          </div>
          <TopProducts />
        </div>
      </div>




    </div>
  )
}

export default Dashboard;