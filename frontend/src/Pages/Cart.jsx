import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';
import { winterProducts } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

/*
  Design notes (so future-you knows the intent):
  - Palette: frost navy (#101B2D) + glacier blue (#2C5F7C) for structure,
    snow/ice neutrals for surfaces, and a single warm "ember" accent
    (#D9684A) for actions — the cozy-against-cold contrast a winter
    clothing brand should own, instead of generic blue/indigo gradients.
  - Headline uses a serif display treatment (swap in a real font like
    "Fraunces" or "Lora" via your font import if you want the full effect —
    font-serif below is the Tailwind fallback).
  - The dashed "stitch" divider under item names is the one signature
    textile detail — a quiet nod to clothing without being literal.
*/

const Cart = () => {
  const { cartItems, updateQuantity, currency } = useContext(ShopContext);
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

  const getPrice = (item) =>
    currency === 'INR' ? `₹${item.pricing.sellingPrice}` : `$${item.pricing.sellingPrice}`;

  const subtotal = cartData.reduce(
    (sum, item) => sum + item.pricing.sellingPrice * item.quantity,
    0
  );
  const symbol = currency === 'INR' ? '₹' : '$';

  const handleIncrease = (item) => updateQuantity(item._id, item.quantity + 1);
  const handleDecrease = (item) => {
    if (item.quantity > 1) updateQuantity(item._id, item.quantity - 1);
  };
  const handleRemove = (item) => updateQuantity(item._id, 0);

  const steps = [
    { key: 'cart', label: 'Cart', icon: assets.cart2, active: true },
    { key: 'checkout', label: 'Checkout', icon: assets.checkout, active: false },
    { key: 'order', label: 'Order', icon: assets.order, active: false },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FA] py-10 px-4 sm:px-6 lg:px-8">
      {/* Progress Trail */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center justify-center">
          {steps.map((step, i) => (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step.active
                      ? 'bg-[#101B2D] border-[#101B2D] shadow-lg'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <img
                    src={step.icon}
                    alt={step.label}
                    className={`w-5 h-5 ${step.active ? 'invert brightness-200' : 'opacity-40'}`}
                  />
                </div>
                <p
                  className={`mt-2 text-xs font-semibold uppercase tracking-wide ${
                    step.active ? 'text-[#101B2D]' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="w-16 sm:w-28 h-px bg-slate-200 mx-3 sm:mx-4 mt-[-20px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
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
                <p className="text-slate-500 mb-8">
                  Nothing here yet — let's find something warm.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-7 py-3.5 bg-[#101B2D] text-white font-semibold rounded-full shadow-sm hover:bg-[#0A1320] transition-colors duration-200"
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
                        src={item.image?.[0]}
                        alt={item.name}
                        className="h-28 w-24 sm:h-32 sm:w-28 object-cover rounded-xl shadow-sm"
                      />
                      <button
                        onClick={() => handleRemove(item)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center hover:bg-[#FDEDE7] transition-colors duration-150"
                      >
                        <img src={assets.delete_icon} alt="" className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-base text-[#101B2D] line-clamp-2">
                        {item.name}
                      </h3>
                      {/* signature stitch divider */}
                      <div className="border-b border-dashed border-slate-200 w-16 my-2" />
                      <p className="text-sm text-slate-500 mb-4 capitalize">{item.category}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-[#F4F7FA] rounded-full border border-slate-200">
                          <button
                            onClick={() => handleDecrease(item)}
                            aria-label="Decrease quantity"
                            className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-[#D9684A] transition-colors rounded-full"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold text-[#101B2D]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrease(item)}
                            aria-label="Increase quantity"
                            className="w-9 h-9 flex items-center justify-center text-slate-600 hover:text-[#D9684A] transition-colors rounded-full"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-[#101B2D]">{getPrice(item)}</p>
                          {item.pricing.mrp > item.pricing.sellingPrice && (
                            <p className="text-xs text-slate-400 line-through">
                              {symbol}
                              {item.pricing.mrp}
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

        {/* Order Summary */}
        <div className="lg:sticky lg:top-8 self-start">
          <div className="bg-[#101B2D] rounded-2xl shadow-lg p-7 sm:p-8 text-white">
            <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span className="text-white font-medium">
                  {symbol}
                  {subtotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 mb-6">
              <label className="text-sm text-slate-300 mb-2 block">Have a coupon?</label>
              <input
                type="text"
                placeholder="Enter code"
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl placeholder:text-slate-400 text-white focus:ring-2 focus:ring-[#D9684A] focus:border-transparent transition-all duration-200"
              />
            </div>

            <div className="border-t border-white/10 pt-5 space-y-5">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-300">Total</span>
                <span className="text-2xl font-bold">
                  {symbol}
                  {subtotal.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => navigate('/placeorder')}
                disabled={cartData.length === 0}
                className="w-full bg-[#D9684A] text-white py-4 rounded-full font-semibold text-base shadow-md hover:bg-[#C75A3D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
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