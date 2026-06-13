import google from './google.png';
import secure from './secure.png';
import customer from './customer.png';
import marketing from './marketing.png';
import dashboard from './dashboard.png';
import orders from './checkout.png';
import order from './order.png';
import addProducts from './add.png';
import bag from './bag.png';
import up  from './icons8-up-100.png';
import down from './icons8-down-100.png';
import winter_x from './winterx_form_side_image.svg';
import calendar from './calendar.png';
import filter from './filter.png';
import list from './list.png';
import del from './delete.png';
import more from './more.png';
import settings from './setting.png';
import analytics from './data-analytics.png';
import offer from './offer.png';

const assets = {
    google,
    secure,
    customer,
    marketing,
    dashboard,
    orders,
    order,
    addProducts, 
    bag,
    up,
    down,
    winter_x,
    calendar,
    filter,
    list,
    del,
    more,
    settings,
    analytics,
    offer,


}


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

export {assets,customers}