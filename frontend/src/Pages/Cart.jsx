import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import OrderSummaryCard from '../Components/OrderSummaryCard';
import axios from 'axios';
import Loading from './Loading';

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    currency,
    decreaseQuantityFromCart,
    increaseQuantityInCart,
    removeItemFromCart,
    backendUrl,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [openremoveItem, setOpenRemoveItem] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllCartData() {
      try {
        setLoading(true);
        const variantsId = [...cartItems.keys()];
        const { data } = await axios.post(
          `${backendUrl}/api/products/getCartItems`,
          { variantsId }
        );

        setCartData(data?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

     fetchAllCartData();
  }, [cartItems]);


  useEffect(() => {
    console.log("cartData is : " , cartData);
  },[cartItems,backendUrl]);

  const getPrice = (item) =>
    currency === 'INR'
      ? `₹${Math.ceil(item.pricing.sellingPrice + (item.variants?.[0]?.priceAdjustment || 0))}`
      : `$${Math.ceil(item.pricing.sellingPrice + (item.variants?.[0]?.priceAdjustment || 0))}`;

  const symbol = currency === 'INR' ? '₹' : '$';

  const handleRemove = () => {
    if (!itemToRemove?.variants?.[0]?._id) return;
    removeItemFromCart(String(itemToRemove.variants[0]._id));
    setItemToRemove(null);
    setOpenRemoveItem(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="min-h-screen bg-[#F4F7FA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
            <div className="flex items-baseline justify-between mb-1">
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#101B2D]">
                Your Cart
              </h1>
              <span className="text-sm text-slate-400 font-medium">
                {cartData.length} {cartData.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <p className="text-slate-500 mb-8">Wrapped up and ready for winter.</p>

            {cartData.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-[#EEF3F7] rounded-full flex items-center justify-center mx-auto mb-6">
                  <img src={assets.cart2} alt="Empty" className="w-9 opacity-50" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#101B2D] mb-2">
                  Your cart is empty
                </h3>
                <button
                  onClick={() => navigate('/')}
                  className="px-7 py-3.5 bg-[#101B2D] text-white font-semibold rounded-full shadow-sm hover:bg-[#0A1320]"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {cartData.map((item) => (
                  <div key={item._id} className="group flex gap-5 py-6 first:pt-0 last:pb-0">
                    <div className="relative shrink-0">
                      <img
                        src={item.variants?.[0]?.image?.[0]}
                        alt={item.name}
                        className="h-28 w-24 sm:h-32 sm:w-28 object-cover rounded-xl shadow-sm"
                      />
                      <button
                        onClick={() => {
                          setItemToRemove(item);
                          setOpenRemoveItem(true);
                        }}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center hover:bg-[#FDEDE7]"
                      >
                        <img src={assets.delete_icon} alt="" className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base text-[#101B2D] line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="border-b border-dashed border-slate-200 w-16 my-2" />
                      <p className="text-sm text-slate-500 mb-4 capitalize">{item.category}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-[#F4F7FA] rounded-full border border-slate-200">
                          <button
                            onClick={() => decreaseQuantityFromCart(item.variants?.[0]?._id)}
                            className="w-9 h-9 flex items-center justify-center text-slate-600"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold text-[#101B2D]">
                            {cartItems.get(String(item.variants?.[0]?._id)) || 0}
                          </span>
                          <button
                            onClick={() =>
                              increaseQuantityInCart(item.variants[0]?._id, item.variants[0]?.stock)
                            }
                            className="w-9 h-9 flex items-center justify-center text-slate-600"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-[#101B2D]">{getPrice(item)}</p>
                          {item.pricing.mrp > item.pricing.sellingPrice && (
                            <p className="text-xs text-slate-400 line-through">
                              {symbol}
                              {Math.ceil(item.pricing.mrp)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-2xl rounded-md p-3 flex flex-col items-start justify-between md:min-h-[350px] min-h-[300px]">
          <div className="flex flex-col items-start">
            <h1 className="text-center text-lg text-gray-600">Your Order</h1>
            <OrderSummaryCard />
            <OrderSummaryCard />
            <OrderSummaryCard />
          </div>

          <button
            className="self-center text-white rounded-xl py-3 px-8 bg-slate-950 hover:scale-105"
            onClick={() => navigate('/placeorder')}
          >
            CheckOut
          </button>
        </div>
      </div>

      {openremoveItem && itemToRemove && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[350px] rounded-xl shadow-lg border border-gray-200 p-5">
            <h1 className="text-sm text-center pt-2">
              Are you sure you want to remove this product?
            </h1>
            <div className="flex items-center justify-between p-4 mt-2">
              <button
                className="bg-red-400 text-white rounded-xl px-3 py-1 hover:bg-red-600"
                onClick={handleRemove}
              >
                Remove Item
              </button>
              <button
                className="bg-blue-600 text-white rounded-xl px-3 py-1 hover:bg-blue-900"
                onClick={() => setOpenRemoveItem(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;