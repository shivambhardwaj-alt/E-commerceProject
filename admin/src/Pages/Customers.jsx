import React, { useEffect, useReducer, useState } from 'react'
import Loading from '../pages/Loading.jsx'
import { assets } from '../assets/assets';
import ShowCustomerInfo from '../components/ShowCustomerInfo.jsx';
const Customers = () => {
  // const [,] = useReducer(filteredState,initialState);
  const[customerSearch,setCustomerSearch] = useState("");
  const [showOutline, setShowOutline] = useState(false);
  const [userPreview, setUserPreview] = useState(false);
  const [userPreviewData, setUserPreviewData] = useState({});
  const[filteredData,setFiltereData] = useState([]);
  const [loading,setLoading] = useState(false) ;
  const [showInfo , setShowInfo] = useState(false);


  // ==========================================================
  const customers = [
    {
      id: "CUST-1001",
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      phone: "+91 9876543210",
      city: "Lucknow",
      state: "Uttar Pradesh",
      country: "India",
      status: "active",
      createdAt: "2025-08-12",
      totalOrders: 5,
      lastOrderAmount: 2499
    },
    {
      id: "CUST-1002",
      name: "Priya Verma",
      email: "priya.verma@example.com",
      phone: "+91 9123456780",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      status: "inactive",
      createdAt: "2025-06-20",
      totalOrders: 2,
      lastOrderAmount: 799
    },
    {
      id: "CUST-1003",
      name: "Rohan Gupta",
      email: "rohan.gupta@example.com",
      phone: "+91 9988776655",
      city: "Noida",
      state: "Uttar Pradesh",
      country: "India",
      status: "active",
      createdAt: "2025-01-15",
      totalOrders: 12,
      lastOrderAmount: 15999
    },
    {
      id: "CUST-1004",
      name: "Ananya Singh",
      email: "ananya.singh@example.com",
      phone: "+91 8877665544",
      city: "Kanpur",
      state: "Uttar Pradesh",
      country: "India",
      status: "active",
      createdAt: "2024-11-02",
      totalOrders: 1,
      lastOrderAmount: 499
    },
    {
      id: "CUST-1005",
      name: "Vikram Mehta",
      email: "vikram.mehta@example.com",
      phone: "+91 9012345678",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      status: "blocked",
      createdAt: "2024-09-18",
      totalOrders: 7,
      lastOrderAmount: 3499
    },

    {
      id: "CUST-1006",
      name: "Neha Joshi",
      email: "neha.joshi@example.com",
      phone: "+91 9811122233",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      status: "active",
      createdAt: "2025-02-10",
      totalOrders: 9,
      lastOrderAmount: 1999
    },
    {
      id: "CUST-1007",
      name: "Aditya Kumar",
      email: "aditya.kumar@example.com",
      phone: "+91 9898989898",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      status: "active",
      createdAt: "2025-03-05",
      totalOrders: 15,
      lastOrderAmount: 8999
    },
    {
      id: "CUST-1008",
      name: "Sneha Patel",
      email: "sneha.patel@example.com",
      phone: "+91 9765432109",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      status: "inactive",
      createdAt: "2024-12-25",
      totalOrders: 3,
      lastOrderAmount: 1299
    },
    {
      id: "CUST-1009",
      name: "Karan Malhotra",
      email: "karan.malhotra@example.com",
      phone: "+91 9654321098",
      city: "Chandigarh",
      state: "Punjab",
      country: "India",
      status: "active",
      createdAt: "2025-07-01",
      totalOrders: 6,
      lastOrderAmount: 5599
    },
    {
      id: "CUST-1010",
      name: "Ishita Roy",
      email: "ishita.roy@example.com",
      phone: "+91 9543210987",
      city: "Kolkata",
      state: "West Bengal",
      country: "India",
      status: "active",
      createdAt: "2025-05-18",
      totalOrders: 4,
      lastOrderAmount: 999
    },

    {
      id: "CUST-1011",
      name: "Mohit Bansal",
      email: "mohit.bansal@example.com",
      phone: "+91 9432109876",
      city: "Indore",
      state: "Madhya Pradesh",
      country: "India",
      status: "active",
      createdAt: "2024-10-10",
      totalOrders: 8,
      lastOrderAmount: 2999
    },
    {
      id: "CUST-1012",
      name: "Divya Nair",
      email: "divya.nair@example.com",
      phone: "+91 9321098765",
      city: "Kochi",
      state: "Kerala",
      country: "India",
      status: "inactive",
      createdAt: "2025-04-22",
      totalOrders: 2,
      lastOrderAmount: 1499
    },
    {
      id: "CUST-1013",
      name: "Siddharth Jain",
      email: "siddharth.jain@example.com",
      phone: "+91 9210987654",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      status: "active",
      createdAt: "2025-06-01",
      totalOrders: 11,
      lastOrderAmount: 6999
    },
    {
      id: "CUST-1014",
      name: "Pooja Reddy",
      email: "pooja.reddy@example.com",
      phone: "+91 9109876543",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      status: "active",
      createdAt: "2024-08-19",
      totalOrders: 13,
      lastOrderAmount: 10999
    },
    {
      id: "CUST-1015",
      name: "Arjun Yadav",
      email: "arjun.yadav@example.com",
      phone: "+91 9008765432",
      city: "Varanasi",
      state: "Uttar Pradesh",
      country: "India",
      status: "blocked",
      createdAt: "2024-07-11",
      totalOrders: 1,
      lastOrderAmount: 399
    },

    {
      id: "CUST-1016",
      name: "Meera Iyer",
      email: "meera.iyer@example.com",
      phone: "+91 8899001122",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      status: "active",
      createdAt: "2025-02-28",
      totalOrders: 10,
      lastOrderAmount: 4599
    },
    {
      id: "CUST-1017",
      name: "Harsh Tiwari",
      email: "harsh.tiwari@example.com",
      phone: "+91 8787878787",
      city: "Prayagraj",
      state: "Uttar Pradesh",
      country: "India",
      status: "active",
      createdAt: "2025-03-14",
      totalOrders: 6,
      lastOrderAmount: 1999
    },
    {
      id: "CUST-1018",
      name: "Tanvi Kapoor",
      email: "tanvi.kapoor@example.com",
      phone: "+91 8676767676",
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      status: "inactive",
      createdAt: "2024-12-01",
      totalOrders: 3,
      lastOrderAmount: 2999
    },
    {
      id: "CUST-1019",
      name: "Nikhil Sinha",
      email: "nikhil.sinha@example.com",
      phone: "+91 8565656565",
      city: "Patna",
      state: "Bihar",
      country: "India",
      status: "active",
      createdAt: "2025-01-09",
      totalOrders: 7,
      lastOrderAmount: 1799
    },
    {
      id: "CUST-1020",
      name: "Aditi Chauhan",
      email: "aditi.chauhan@example.com",
      phone: "+91 8454545454",
      city: "Dehradun",
      state: "Uttarakhand",
      country: "India",
      status: "active",
      createdAt: "2025-06-30",
      totalOrders: 5,
      lastOrderAmount: 2499
    },

    {
      id: "CUST-1021",
      name: "Rajesh Khanna",
      email: "rajesh.khanna@example.com",
      phone: "+91 8343434343",
      city: "Nagpur",
      state: "Maharashtra",
      country: "India",
      status: "active",
      createdAt: "2024-09-05",
      totalOrders: 14,
      lastOrderAmount: 7999
    },
    {
      id: "CUST-1022",
      name: "Simran Kaur",
      email: "simran.kaur@example.com",
      phone: "+91 8232323232",
      city: "Ludhiana",
      state: "Punjab",
      country: "India",
      status: "inactive",
      createdAt: "2025-05-11",
      totalOrders: 2,
      lastOrderAmount: 999
    },
    {
      id: "CUST-1023",
      name: "Deepak Sharma",
      email: "deepak.sharma@example.com",
      phone: "+91 8121212121",
      city: "Bhopal",
      state: "Madhya Pradesh",
      country: "India",
      status: "active",
      createdAt: "2025-07-20",
      totalOrders: 8,
      lastOrderAmount: 3499
    },
    {
      id: "CUST-1024",
      name: "Shreya Ghosh",
      email: "shreya.ghosh@example.com",
      phone: "+91 8010101010",
      city: "Siliguri",
      state: "West Bengal",
      country: "India",
      status: "active",
      createdAt: "2025-04-02",
      totalOrders: 6,
      lastOrderAmount: 2199
    },
    {
      id: "CUST-1025",
      name: "Yash Pandey",
      email: "yash.pandey@example.com",
      phone: "+91 8009090909",
      city: "Gorakhpur",
      state: "Uttar Pradesh",
      country: "India",
      status: "blocked",
      createdAt: "2024-06-15",
      totalOrders: 1,
      lastOrderAmount: 599
    }
  ]; 
  const filterData = ()=> {
    const tempData =  []
    if(customerSearch == ""){
        customers.forEach((item,index) => {
          tempData.push(item);
        });
    }else{
        customers.forEach((item,index) => {
          for(let key in item){
            if(String(item[key]).toLowerCase().includes(customerSearch.toLowerCase())){
              tempData.push(item);
              break;
            }
          }
        })
    }
    return tempData;

  }

  const sortData = () => {

  }
  useEffect(() => {
    const result = filterData();
    setFiltereData(result);
  },[customerSearch])

  // =========================================================
  return (
    
    loading ? <div><Loading /></div> : <div className='p-1 m-1'>
      <div className='flex md:flex-row flex-col items-center justify-between p-2 mt-1'>
        <h1 className='text-2xl font-stretch-100% font-mono text-gray-700'>Customers</h1>
        <div className='flex md:flex-row flex-col gap-3 items-center justify-start'>
          <div className={`border-2 ${showOutline ? 'border-blue-500 transition-all duration-200 scale-105' : 'border-gray-500'} flex flex-row items-center justify-center gap-2 rounded-xl outline-none p-3 py-2 mt-2`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 30 30" fill="#9CA3AF">
              <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
            </svg>
            <input
              type="text"
              onFocus={() => setShowOutline(true)}
              onBlur={() => setShowOutline(false)}
              placeholder="Search Customer..."
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className='w-full h-full bg-transparent text-sm outline-none placeholder-gray-400'
            />
          </div>
          <button className='bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r rounded-xl cursor-pointer p-2 mt-2 text-white shadow-lg hover:text-amber-200'>New Customer</button>
        </div>
      </div>
      <hr className='text-gray-500' />
      {/* ========================== data showing here ============== */}
      <div className='relative'>
        <ShowCustomerInfo showInfo = {showInfo} />

        <table className='w-full min-w-187.5 text-sm'>
          <thead className='divide-y divide-gray-400'>
            <tr className='hover:bg-gray-100 transition-all duration-300 hover:scale-105'>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'> Name</th>

              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>Phone</th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>Register</th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>Country</th>
              <th className='px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {
              filteredData.map((item, index) => {
                return (
                  <tr key={index} className=' transition-all duration-200    cursor-pointer'>
                    <td className='px-4 py-3 text-left text-xs text-gray-500  font-semibold flex flex-col'><span className=''>{item.name}</span><span>{item.email}</span></td>
                    <td className='px-4 py-3 text-left text-xs text-gray-500 '>{item.phone}</td>
                    <td className='px-4 py-3 text-left text-xs text-gray-500 '>{item.createdAt}</td>
                    <td className='px-4 py-3 text-left text-xs text-gray-500 '>{item.country}</td>
                    <td className='px-4 py-3 text-left text-xs'>
                      <img src={assets.more} alt="" className='w-5 h-5 opacity-60 ' />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>

        </table>

        <div className='flex flex-row items-center justify-between mt-4 p-1'>
          <p className='text-xs p-2 m-1 text-gray-700'>Showing {customers.length} customers</p>


          <div class="flex items-center justify-between w-full max-w-80 text-gray-500 font-medium">
            <button type="button" aria-label="prev" class="rounded-full bg-slate-200/50">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" stroke-width=".078" />
              </svg>
            </button>

            <div class="flex items-center gap-2 text-sm font-medium">
              <button class="h-10 w-10 flex items-center justify-center aspect-square">1</button>
              <button class="h-10 w-10 flex items-center justify-center aspect-square">2</button>
              <button class="h-10 w-10 flex items-center justify-center aspect-square text-indigo-500 border border-indigo-200 rounded-full">3</button>
              <button class="h-10 w-10 flex items-center justify-center aspect-square">4</button>
              <button class="h-10 w-10 flex items-center justify-center aspect-square">5</button>
            </div>

            <button type="button" aria-label="next" class="rounded-full bg-slate-200/50">
              <svg class="rotate-180" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z" fill="#475569" stroke="#475569" stroke-width=".078" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/*  */}







    </div>
  )
}

export default Customers