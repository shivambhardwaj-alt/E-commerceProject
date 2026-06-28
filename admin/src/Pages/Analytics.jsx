
import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { 
  Settings, Globe, Shield, BarChart2, CreditCard, 
  Download, Calendar, TrendingUp, DollarSign, Activity 
} from 'lucide-react';

// --- MOCK DATA ---
// Spiked during winter months (Jan, Feb, Nov, Dec)
const lineChartData = [
  { name: 'Jan', sales: 85, traffic: 120 },
  { name: 'Feb', sales: 70, traffic: 100 },
  { name: 'Mar', sales: 40, traffic: 60 },
  { name: 'Apr', sales: 30, traffic: 50 },
  { name: 'May', sales: 20, traffic: 40 },
  { name: 'Jun', sales: 15, traffic: 35 },
  { name: 'Jul', sales: 15, traffic: 35 },
  { name: 'Aug', sales: 25, traffic: 45 },
  { name: 'Sep', sales: 45, traffic: 70 },
  { name: 'Oct', sales: 65, traffic: 95 },
  { name: 'Nov', sales: 90, traffic: 130 },
  { name: 'Dec', sales: 100, traffic: 150 },
];

const radarData = [
  { subject: 'Jackets', A: 120, B: 110, fullMark: 150 },
  { subject: 'Sweaters', A: 98, B: 130, fullMark: 150 },
  { subject: 'Thermals', A: 86, B: 130, fullMark: 150 },
  { subject: 'Gloves', A: 99, B: 100, fullMark: 150 },
  { subject: 'Scarves', A: 85, B: 90, fullMark: 150 },
  { subject: 'Beanies', A: 65, B: 85, fullMark: 150 },
];

const Analytics = () => {
  
    const [activeTab, setActiveTab] = useState('Analytics');

  const navItems = [
    { name: 'General', icon: Settings },
    { name: 'Domains', icon: Globe },
    { name: 'Site Access & Versions', icon: Shield },
    { name: 'Analytics', icon: BarChart2 },
    { name: 'Plans', icon: CreditCard },
  ];

  return (
    <div className="flex bg-gray-50 text-gray-800 font-sans">

     
      <main className="flex-1 overflow-y-auto p-6 md:p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Store Analytics Overview</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track your winter collection's performance, traffic, and sales in one place.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-2 shadow-sm">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Jan 2026 - Dec 2026</span>
            </div>
            <button className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Export Report</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {/* Card 1: Total Revenue */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-900">$124.5K</h3>
              </div>
              <div className="p-2 bg-green-50 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs font-medium text-green-600 mt-4 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              ↑ 18% <span className="text-gray-400 font-normal ml-1">vs last season</span>
            </p>
          </div>

          {/* Card 2: Conversion Rate */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">3.8%</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-full">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-xs font-medium text-green-600 mt-4 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              ↑ 0.5% <span className="text-gray-400 font-normal ml-1">industry avg: 2.1%</span>
            </p>
          </div>

          {/* Card 3: Bounce Rate */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Bounce Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">42.1%</h3>
              </div>
              <div className="p-2 bg-orange-50 rounded-full">
                <BarChart2 className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <p className="text-xs font-medium text-red-500 mt-4 flex items-center">
              ↓ 2.4% <span className="text-gray-400 font-normal ml-1">from summer</span>
            </p>
          </div>

          {/* Card 4: Top Region */}
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Top Region</p>
                <h3 className="text-2xl font-bold text-gray-900">North America</h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-full">
                <Globe className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <p className="text-xs font-medium text-gray-500 mt-4">
              Accounts for 54% of heavy winter coat sales.
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Line Chart (Spans 2 columns on large screens) */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Sales & Traffic Trends</h3>
                <p className="text-sm text-gray-500">Yearly overview of store visitors vs converted sales.</p>
              </div>
              <select className="border border-gray-300 text-sm rounded-md px-2 py-1 bg-white outline-none">
                <option>All Time</option>
                <option>This Year</option>
              </select>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" name="Store Traffic (k)" dataKey="traffic" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" name="Sales Revenue ($k)" dataKey="sales" stroke="#fbbf24" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Radar Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-gray-900">Category Performance</h3>
              <button className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 hover:bg-gray-200">Details</button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Comparison of product category views vs actual sales.</p>

            <div className="h-64 w-full flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Views" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="Sales" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.4} strokeWidth={2} />
                  <RechartsTooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </main>
    </div>

  )
}

export default Analytics