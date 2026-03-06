import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';
import { winterProducts } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity,  currency } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const array = [];
    for (const [key, value] of cartItems) {
      const product = winterProducts.find(item => item._id === key);
      if (product) array.push({ ...product, quantity: value });
    }
    setCartData(array);
  }, [cartItems]);

  const getPrice = (item) => currency === 'INR' ? `₹${item.pricing.sellingPrice}` : `$${item.pricing.sellingPrice}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Progress Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center justify-center space-x-12 lg:space-x-20">
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <img src={assets.cart2} alt="Cart" className="w-6 h-6" />
            </div>
            <p className="mt-2 text-sm font-medium text-slate-700 font-inter">Cart</p>
            <div className="w-6 h-1 bg-blue-500 rounded-full mt-1 group-hover:w-12 transition-all duration-300"></div>
          </div>
          
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 bg-slate-100/60 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <img src={assets.checkout} alt="Checkout" className="w-6 h-6 opacity-60" />
            </div>
            <p className="mt-2 text-sm font-medium text-slate-500">Checkout</p>
          </div>
          
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
          
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 bg-slate-100/60 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
              <img src={assets.order} alt="Order" className="w-6 h-6 opacity-60" />
            </div>
            <p className="mt-2 text-sm font-medium text-slate-500">Order</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 lg:gap-12">
        
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 bg-clip-text text-transparent mb-2">
              Your Cart
            </h1>
            <p className="text-slate-600 text-lg mb-8 font-light">Review your winter essentials</p>
            
            {cartData.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <img src={assets.cart2} alt="Empty" className="w-12 opacity-40" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h3>
                <p className="text-slate-600 mb-8">Add some cozy winter clothes to get started</p>
                <button 
                  onClick={() => navigate('/')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartData.map((item, index) => (
                  <div key={item._id} className="group flex gap-6 p-6 bg-gradient-to-r from-white/50 to-slate-50/50 rounded-2xl border border-slate-200/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-blue-200/50">
                    <div className="relative">
                      <img 
                        src={item.image?.[0]} 
                        alt={item.name}
                        className="h-28 w-24 sm:h-32 sm:w-28 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all duration-200">
                        <img src={assets.delete_icon} alt="Remove" className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-slate-800 line-clamp-2 mb-2">{item.name}</h3>
                      <p className="text-sm text-slate-600 mb-4">{item.category}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white/60 px-3 py-1 rounded-xl border border-slate-200 shadow-sm">
                          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors">
                            <span className="text-xl font-bold text-slate-700">+</span>
                          </button>
                          <span className="px-4 py-1 font-bold text-lg text-slate-800 min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors">
                            <span className="text-xl font-bold text-slate-700">-</span>
                          </button>
                        </div>
                        <div className="text-right flex-1">
                          <p className="text-2xl font-bold text-slate-800">
                            {getPrice(item)}
                          </p>
                          <p className="text-sm text-slate-500 line-through">
                            {currency === 'INR' ? '₹' : '$'}{item.pricing.mrp || ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-8 self-start">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100/50 p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal ({cartData.length} items)</span>
                <span className="text-slate-800">
                  {cartData.reduce((sum, item) => sum + (item.pricing.sellingPrice * item.quantity), 0).toLocaleString()}
                  {currency === 'INR' ? '₹' : '$'}
                </span>
              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-slate-700 font-medium">Add a Coupon</label>
                  <span className="text-sm text-green-600 font-semibold">SAVE ₹200</span>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter your code" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 space-y-4">
              <div className="flex justify-between text-2xl font-bold text-slate-800">
                <span>Total</span>
                <span>
                  {cartData.reduce((sum, item) => sum + (item.pricing.sellingPrice * item.quantity), 0).toLocaleString()}
                  {currency === 'INR' ? '₹' : '$'}
                </span>
              </div>
              
              <button 
                onClick={() => navigate('/placeorder')}
                className="w-full bg-gradient-to-r from-black via-slate-700 to-slate-600 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300" 
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
