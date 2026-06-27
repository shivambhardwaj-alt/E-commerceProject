import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProduct from '../Components/RelatedProduct';
import axios from 'axios';
import { products } from '../assets/assets';

const Product = () => {
  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);

  const { slug } = useParams();
  const { increaseQuantityInCart, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/products/main-product`,
          { params: { slug } }
        );

        const product = data?.data || data;
        setProductData(product);

        const firstVariant = product?.variants?.[0] || null;
        setSelectedVariant(firstVariant);
        setSelectedImage(firstVariant?.image?.[0] || product?.image?.[0] || '');
      } catch (error) {
        console.log(error);
      }
    };

    if (slug && backendUrl) fetchProductDetails();
  }, [slug, backendUrl]);

  const handleImageClick = (img) => setSelectedImage(img);
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    if (variant?.image?.[0]) setSelectedImage(variant.image[0]);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 0);
    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
        {Array.from({ length: 5 - fullStars }).map((_, i) => (
          <span key={`e-${i}`}>☆</span>
        ))}
      </>
    );
  };

  if (!productData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const thumbnails =
    selectedVariant?.image?.length
      ? selectedVariant.image
      : productData?.variants?.[0]?.image || productData?.image || [];

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex mb-8 text-sm text-gray-500">
          <a href="/" className="hover:text-gray-900">Home</a>
          <span className="mx-2">/</span>
          <a href="/collection" className="hover:text-gray-900">Collection</a>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">{productData.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="rounded-xl p-2">
              <div className="aspect-full  rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt={productData.name}
                  className="max-w-full max-h-full object-contain "
                />
              </div>
            </div>

            {thumbnails.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {thumbnails.map((img, index) => (
                  <div
                    key={index}
                    className={`  p-2  cursor-pointer transition-all  border-2 ${selectedImage === img ? 'border-blue-200 rounded-xl ' : 'border-transparent'
                      }`}
                    onClick={() => handleImageClick(img)}
                  >
                    <div className="aspect-full w-full overflow-hidden  flex items-center justify-center">
                      <img
                        src={img}
                        alt=""
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 mt-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 prata-regular">
                {productData.name}
              </h1>
              <p className="text-xl text-gray-500 mb-1">
                by {productData.brand}{' '}
                <span className="text-gray-600 text-sm ml-4">
                  (Only {selectedVariant?.stock ?? 0} left)
                </span>
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400 text-lg">
                  {renderStars(productData.ratings?.average)}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {productData.ratings?.average ?? 0}
                </span>
                <span className="text-sm text-gray-500">
                  ({productData.ratings?.totalReviews ?? 0} reviews)
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{Math.ceil(productData.pricing.sellingPrice + selectedVariant.priceAdjustment)}
                  </span>
                  {productData.pricing?.mrp > productData.pricing?.sellingPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ₹{productData.pricing.mrp}
                    </span>
                  )}
                </div>
                {productData.pricing?.discountPercentage > 0 && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {productData.pricing.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            {productData.variants?.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Available Size</h3>
                <div className="flex flex-wrap gap-3 rounded-xl bg-blue-800 text-white  text-lg max-w-10 px-1 py-1 pl-3">
                  {selectedVariant.size}
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-lg mb-2">Available Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVariant?.color ? (
                      <span className="px-3 py-1 rounded-full  text-white bg-blue-800  lowercase ">
                        {selectedVariant.color}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">No color data available</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {productData.attributes && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Product Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(productData.attributes).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <span className="text-gray-500 capitalize">{key.replace('_', ' ')}:</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className={`${!productData.shipping?.freeShipping && "line-through"}`}>Free Shipping</span>
                <span>•</span>
                <span>{productData.returnPolicy?.returnDays} Day Returns</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  className="bg-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-200"
                  onClick={() => increaseQuantityInCart({ ...productData, selectedVariant })}
                >
                  Add to Cart
                </button>
                <button
                  className="border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                  onClick={() => navigate('/cart')}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr className=' border-gray-200 mt-10' />
        <div className='mt-20'>
          <h1 className='text-3xl prata-regular text-gray-700 font-bold'>More Similar Products for you</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-10 mt-20 ">
            {productData.variants.map((item, index) => (
              item._id !== selectedVariant._id && (
                <div
                  key={item._id}
                  className="cursor-pointer"
                  onClick={() => { setSelectedVariant(item); setSelectedImage(item.image[0]) }}
                >
                  <img
                    src={item.image?.[0]}
                    alt=""
                    className="w-full aspect-square object-contain rounded-lg"
                  />
                  <div className='flex items-center justify-between mt-3 md:px-10 px-20'>
                    <p className="text-sm">{item.color} - {item.size}</p>
                    <p>₹{Math.ceil(item.priceAdjustment + productData.pricing.sellingPrice)}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
        <hr className='mt-10 border-gray-200' />
        {productData.description && (
          <div className="mt-20">

            <h1 className='text-3xl text-gray-600 prata-regular tracking-widest'>{`Description`}</h1>
            <p className='text-gray-500 tracking-wider mt-4 '>{productData.description.short}</p>
            <p className='text-gray-500 tracking-wider mt-4 '>{productData.description.long}</p>
            <p className='text-gray-500 tracking-wider mt-4 '>{productData.seo.description}</p>
            <div className='mt-4'>
              <h2 className='text-gray-600 prata-regular text-lg tracking-widest '>{`Size Guide `} <span className='text-sm text-gray-700 tracking-tighter'>(model)</span></h2>
              <div className='flex flex-row items-center justify-start gap-10 mt-4'>
                <p className='text-gray-600 tracking-wider'>{productData.sizeGuide.modelHeight}</p>
                <p className='text-gray-600 tracking-wider'>{productData.sizeGuide.modelSize}</p>
                <p className='text-gray-600 tracking-wider'>{productData.sizeGuide.fitAdvice}</p>
              </div>
            </div>


          </div>
        )}
        <hr  className='border-gray-400 mt-20'/>

        <RelatedProduct brand={productData.brand} category={productData.category} />
      </div>
      <div className='flex flex-row items-center justify-center mt-24'>
        <button className='text-white bg-gray-900 px-10 py-2 text-lg' >View More</button>
      </div>
    </div>


        
  );
};

export default Product;