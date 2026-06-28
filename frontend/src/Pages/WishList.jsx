import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets, winterProducts } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
const WishList = () => {
  const { wishList, setWishList, addToWishList, addToCart, removeFromWishlist  ,backendUrl} = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchWishList = async () => {
      try {
        const { data } = await axios.post(`${backendUrl}/api/products/getWishlist`, { productsId: [...wishList]});
        console.log(data);
        setProducts(data.data);
      }catch(error){
        console.log(error);
      }
  
  }
    fetchWishList();
  
    
    setLoading(false);


  }, [wishList]);

  const handleMoveToCart = (e, productId) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(productId);
    toast.success("Added to cart")
  };

  const handleRemove = (e, productId) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromWishlist(productId);
    toast.success("Removed from wishlist")
  };


  const navigate = useNavigate();


  return (

    loading ? <Loading /> :
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-sm text-gray-500">{products.length} items</p>
              </div>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-lg flex items-center justify-center">
                <img src={assets.heart_icon} alt="Empty" className="w-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500 mb-6">Like something to add it to your wishlist</p>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md font-medium transition-all duration-200 hover:bg-gray-900 hover:scale-105 hover:text-white">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product, index) => (
                <div key={product._id} className="bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden">
                  <div className="p-4 md:p-6 flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-24 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain rounded border"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 py-1">
                      <h3 className="font-semibold text-gray-900 text-base line-clamp-2 mb-2">
                        {product.name || 'Winter Item'}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center text-yellow-400 text-sm">
                          {product.ratings.totalReviews}

                          {/* here addition of stars is needed  */}
                        </div>
                        <span className="text-xs text-gray-500">| <span className={!product.freeShipping
                          && "line-through"}>Free Delivery</span></span>
                      </div>

                      <div className="space-y-1 mb-4">
                        <p className="text-lg font-bold text-gray-900">
                          ₹{Math.ceil(product.pricing?.sellingPrice || 0 + product.variants[0]?.priceAdjustment)}
                        </p>
                        {product.pricing?.mrp && (
                          <p className="text-sm text-gray-500 line-through">
                            ₹{product.pricing.mrp}
                          </p>
                        )}
                        {product.pricing?.discountPercentage && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded">
                            {product.pricing.discountPercentage}% off
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-gray-100">
                        <button
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
                          onClick={(e) => handleMoveToCart(e, product.variantId)}
                        >
                          Move to Cart
                        </button>
                        <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 bg-white text-sm font-medium rounded-md hover:bg-gray-50 transition-colors" onClick={() => navigate(`/product/${product.slug}`)}>
                          Buy Now
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full ml-2 group"
                      onClick={(e) => handleRemove(e, product._id)}
                    >
                      <img src={assets.delete_icon} alt="Remove" className="w-5 opacity-70 group-hover:opacity-100" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  )
}

export default WishList;
