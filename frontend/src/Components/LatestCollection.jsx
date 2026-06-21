import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { products, winterProducts } from '../assets/assets';
import Title from './Title';
import ProductItem from './ProductItem';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const {addToWishList,addToCart} = useContext(ShopContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    setLatestProducts(winterProducts.reverse().slice(0, 4));

  }, []);

  return (
    <div className='my-20'>
     
      <div className='my-12 py-12 bg-gradient-to-b from-slate-50 to-white'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
         
            <div className='flex flex-col sm:flex-row items-center gap-6 lg:gap-8 flex-shrink-0'>
              <img 
                src={assets.Latest1} 
                alt="Featured Collection 1" 
                className='w-64 h-80 lg:w-72 lg:h-88 object-cover rounded-3xl shadow-2xl ring-8 ring-white/60 bg-gradient-to-br from-blue-100/80 to-indigo-100/80 p-4'
              />
              <img 
                src={assets.Latest2} 
                alt="Featured Collection 2" 
                className='w-64 h-80 lg:w-72 lg:h-88 object-cover rounded-3xl shadow-2xl ring-8 ring-white/60 bg-gradient-to-br from-purple-100/80 to-pink-100/80 p-4'
              />
            </div>

            {/* Right - Text Content */}
            <div className='lg:flex-1 text-center lg:text-left space-y-6 max-w-lg'>
              <h2 className='text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent leading-tight prata-regular'>
                TRENDY 
                <span className='block'>COLLECTION</span>
              </h2>
              
              <p className='text-xl text-gray-600 leading-relaxed'>
                Discover the latest winter trends with our carefully curated collection. 
                Bold designs, premium fabrics, and unbeatable style for the modern wardrobe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products Section -  */}
      <div className='max-w-7xl mx-auto px-6 mt-20'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-8 prata-regular bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent'>
            Our Featured Products
          </h1>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8'>
          {latestProducts.map((product, index) => (
            <div key={product._id || index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-gray-100 cursor-pointer" onClick={(e) => navigate(`/product/${product._id}`)}>
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 p-4">
                <img 
                  src={product.image?.[0]} 
                  alt={product.name} 
                  className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg">
                    <img src={assets.heart_icon} alt="Wishlist" className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" onClick={() => {addToWishList(product) ;toast.success("Added to wishlist") }} />
                    <img src={assets.cart2} alt="Add to cart" className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" onClick={() => {addToCart(product._id) ; toast.success("Added to cart") }} />
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-3">
                <h3 className="font-semibold text-lg text-gray-900 leading-tight line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.round(product.ratings?.average || 0) }).map((_, i) => (
                    <img key={i} src={assets.star_icon} alt="Star" className="w-4 h-4 fill-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.ratings?.totalReviews || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.pricing?.currency === 'INR' ? '₹' : 
                     product.pricing?.currency === 'USD' ? '$' : 
                     product.pricing?.currency === 'EUR' ? '€' : 
                     product.pricing?.currency === 'GBP' ? '£' : ''}{product.pricing?.sellingPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className='max-w-7xl mx-auto px-6 my-24 relative'>
        <img src={assets.girlBanner} alt="" className='w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-2xl' />
        <div className='absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-white max-w-lg'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight'>Want to grab some deals in winter</h1>
          <p className='text-lg md:text-xl text-white/90 mb-6'>Limited time winter sale - up to 50% off premium collection</p>
          <button className='px-8 py-3 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transition-all duration-300'>
            Shop Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
