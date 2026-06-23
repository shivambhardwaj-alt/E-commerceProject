import React, { useContext, useState, useEffect, useReducer } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const ProductItem = ({ product }) => {
  const { cartItems, currency, addToCart, addToWishList, wishlist ,increaseQuantityInCart } = useContext(ShopContext)
  const [toggleWishList, setIsInWishlist] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)


  const initialState = {
    name : product.name , 
    brand : product.brand,
    mrp : product.pricing.mrp,
    sellingPrice : product.pricing.sellingPrice,
    discountPercentage: product.pricing.discountPercentage,
    currency : product.pricing.currency,
    taxIncluded : product.pricing.taxIncluded,
    ifVariant: false,
    colorIfVariant : product.variants.color,
    sizeIfVariant:product.variants.size,
    stockifVariant : product.variants.stock,
    ifVariantId:product.variants.variantId,
    ifVariantPriceAdjustment: product.variants.priceAdjustment,
    returnable : product.returnPolicy.returnable,
    returndays:product.returnPolicy.returnDays,
    exchangeAllowed:product.returnPolicy.exchangeAllowed,

  }

  const [isVariant,setIsVariant] = useState(false);


  function reducer(state,action){




  }

  const [state, dispatch] = useReducer(reducer,initialState);


 
  const safeProduct = {
    _id: product?._id || '',
    name: product?.name || 'Product Name',
    brand: product?.brand || 'Brand',
    slug: product?.slug || product?._id || '',
    image: product?.image || [assets.placeholder || ''],
    pricing: product?.pricing || { sellingPrice: 0, mrp: 0, discountPercentage: 0 },
    ratings: product?.ratings || { average: 0, totalReviews: 0 },
    variants: product?.variants || [{ size: 'M' }],
    bestseller: product?.bestseller || false
  }

  // Initialize wishlist state
  useEffect(() => {
    setIsInWishlist(wishlist?.includes(safeProduct._id) || false)
  }, [wishlist, safeProduct._id])

  const discount = safeProduct.pricing?.discountPercentage || 0

  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating)
    const emptyStars = 5 - fullStars
    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-400">★</span>
        ))}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <span key={`empty-${index}`} className="text-yellow-300">☆</span>
        ))}
      </>
    )
  }

  const handleWishlist = (e,safeProduct) => {
    e.preventDefault()
    e.stopPropagation()
    addToWishList(safeProduct)
    toast.success("Added to wishlist");  }

  const handleCart = (e , safeProduct) => {
    e.preventDefault()
    e.stopPropagation()
    increaseQuantityInCart(safeProduct)
    
  }

  return (
    <div className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 pt-[130%]">
        <Link to={`/product/${safeProduct._id}`} className="block absolute inset-0">
          <img 
            src={safeProduct.image[imageIndex] || assets.placeholder} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            alt={safeProduct.name}
          />
          
          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2">
            <button
                onClick={(e) => handleWishlist(e, product)}
              className={`w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                toggleWishList ? 'text-red-500 bg-red-50' : 'text-gray-600 hover:text-red-500'
              }`}
              title={toggleWishList ? "Remove from wishlist" : "Add to wishlist"}
            >
              <img src={assets.heart_icon} alt="Wishlist" className='w-5' />
            </button>
            <button
                onClick={(e) => handleCart(e, product)}
              className="w-10 h-10 bg-white/90 hover:bg-blue-50 rounded-full flex items-center justify-center shadow-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
              title="Add to cart"
            >
              <img src={assets.cart2} alt="Cart" className='w-5' />
            </button>
          </div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
              {discount}% OFF
            </div>
          )}

          {/* Bestseller Badge */}
          {safeProduct.bestseller && (
            <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold shadow-lg -mt-12">
              BESTSELLER
            </div>
          )}
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${safeProduct.slug}`} className="block hover:text-blue-600 transition-colors">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-2">
            {safeProduct.name}
          </h3>
          <p className="text-xs text-gray-500 capitalize">{safeProduct.brand}</p>
        </Link>
        
        {/* Pricing & Rating */}
        <div className="flex items-center justify-between mt-3">
          <div className="space-y-1">
            <p className="text-lg font-bold text-gray-900">
              {currency}{safeProduct.pricing.sellingPrice || 0}
            </p>
            {safeProduct.pricing.mrp > safeProduct.pricing.sellingPrice && (
              <p className="text-xs text-gray-400 line-through">
                {currency}{safeProduct.pricing.mrp}
              </p>
            )}
          </div>
          
          {/* Dynamic Rating */}
          <div className="flex flex-col items-end space-y-1">
            <div className="flex text-yellow-400 text-sm">
              {renderStars(safeProduct.ratings.average)}
            </div>
            <span className="text-xs text-gray-500">
              ({safeProduct.ratings.totalReviews || 0})
            </span>
          </div>
        </div>

        {/* Size Availability */}
        <div className="mt-2 flex flex-wrap gap-1">
          {safeProduct.variants.slice(0, 3).map((variant, index) => (
            <span key={variant.variantId || index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {variant.size || 'M'}
            </span>
          ))}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
    </div>
  )
}

export default ProductItem
