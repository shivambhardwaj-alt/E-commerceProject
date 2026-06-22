import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Collection from './Pages/Collection';
import Contact from './Pages/Contact';
import PlaceOrder from './Pages/PlaceOrder';
import Order from './Pages/Order';
import Login from './Pages/Login';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import About from './Pages/About';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SearchBar from './Components/SearchBar';
import OtpVerification from './Pages/OtpVerification';
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from './Pages/ForgotPassword';
import Filter from './Components/Filter';
import RightSideFilter from './Components/RightSideFilter';
import MenPage from './Pages/Menpage';
import WomenPage from './Pages/WomenPage';
import KidsPage from './Pages/KidsPage';
import NewArrivals from './Pages/NewArrivals';
import BestOffers from './Pages/BestOffers';
import Sale from './Pages/Sale';
import WishList from './Pages/WishList';
import MyProfile from './Pages/MyProfile';
import ResetPassword from './Pages/ResetPassword';
import PersonalInfo from './Components/PersonalInfo';
import ManageAddress from './Components/ManageAddress';
import PageNotFound from './Pages/PageNotFound';
const App = () => {
  return (
    <div className='px-4 sm:px[5vw] md:px -[2vw] lg:px-[1vw]'>
      <ToastContainer position='bottom-right' />



      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/orders' element={<Order />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/otp-verification' element={<OtpVerification />} />
        <Route path='/cart' element={<
          Cart />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/filter' element={<Filter />} />

        <Route path='/right-side-filter' element={<RightSideFilter />} />
        <Route path='/categories/mens' element={<MenPage />} />
        <Route path='/categories/womens' element={<WomenPage />} />

        <Route path='/categories/kids' element={<KidsPage />} />
        <Route path='/shop/new-arrivals' element={<NewArrivals />} />
        <Route path='/shop/best-offers' element={<BestOffers />} />
        <Route path='shop/sale' element={<Sale />} />
        <Route path='/wishlist' element={<WishList />} />

        <Route path="/profile" element={<MyProfile />}>
          <Route index element={<PersonalInfo />} />
          <Route path="personal-info" element={<PersonalInfo />} />
          <Route path="manage-address" element={<ManageAddress />} />
        </Route>


          <Route  path = "*"  element = {<PageNotFound />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App