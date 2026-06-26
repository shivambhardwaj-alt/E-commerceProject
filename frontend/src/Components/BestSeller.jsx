import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { assets, winterProducts } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import  axios from "axios";

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const { addToCart, addToWishList ,backendUrl } = useContext(ShopContext);
  
  const navigte = useNavigate();
  const bestProducts = winterProducts.reverse().filter(product => product.bestseller);
  
  // loading effect is needed to add here
  useEffect(() => {
    const fetchBestSellerProducts = async() => {
      try{
        const { data } = await axios.get(backendUrl + "/api/products/bestSeller");
        setBestSeller(data.data);
      }catch(error){
        console.log(error);
      } 
    }


    fetchBestSellerProducts();

  }, []);

  const cartHandler = (productId) => {
    addToCart(productId);
  };

  const wishlistHandler = (product) => {
    addToWishList(product);
  };

  return (
    <div className="my-20 max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 prata-regular bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent drop-shadow-2xl'>
          Best Seller For You
        </h1>
        <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8'>
          Explore our best-selling collection, handpicked for style and quality.
        </p>
        
        <div className='flex flex-row items-center justify-center gap-2 text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer group'>
          <span>Explore Our Collection</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {bestSeller.map((product, index) => (
          <div key={product._id || index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-gray-100 cursor-pointer" onClick={() => navigte(`/product/${product._id}`)}>
            {/* Product Image */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 p-4">
              <img 
                src={product.variants[0].image.length > 0 && product.variants[0].image[0] } 
                alt={product.name} 
                className="w-full h-64 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              {/* Bestseller Badge */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                 BESTSELLER
              </div>
              
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex flex-col gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg">
                  <img 
                    src={assets.heart_icon} 
                    alt="Wishlist" 
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform p-1 rounded hover:bg-gray-100" 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToWishList(product);
                      toast.success("Added to wishlist")
                    }}
                  />
                  <img 
                    src={assets.cart2} 
                    alt="Add to cart" 
                    className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform p-1 rounded hover:bg-gray-100" 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                      toast.success("Added to cart");
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-6 space-y-3">
              <h3 className="font-semibold text-lg text-gray-900 leading-tight line-clamp-2 hover:text-blue-600 transition-colors">{product.name}</h3>
              
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
  );
};

export default BestSeller;
