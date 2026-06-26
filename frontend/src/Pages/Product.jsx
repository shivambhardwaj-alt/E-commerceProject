import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { winterProducts } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import RelatedProduct from '../Components/RelatedProduct';
import { toast } from 'react-toastify';
import axios from 'axios';
const Product = () => {
  const [productData, setProductData] = useState({});
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState({});
  const { productId } = useParams();
  const {increaseQuantityInCart ,backendUrl} = useContext(ShopContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (winterProducts && winterProducts.length > 0) {
      const product = winterProducts.find(item => item._id === productId);
      if (product) {
        setProductData(product);
        setSelectedImage(product.image[0]);
        setSelectedVariant(product.variants[0]);
      }
    }
  }, [productId]);


  const {slug} = useParams();

  useEffect(() => {
    const fetchProductDetails = async() => {
      try{

        const {data} = await axios.get(backendUrl + "/api/products/main-product" , {params : {slug : slug}});

        console.log(data);


      }catch(error){
        console.log(error);
      }
    }

    fetchProductDetails();
  },[])




  // useEffect(() => {

  // },[productId])

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };
  

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  if (!productData.name) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => <span key={i} className="text-yellow-400">★</span>)}
        {Array.from({ length: 5 - fullStars }).map((_, i) => <span key={`e-${i}`}>☆</span>)}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <a href="/" className="hover:text-gray-900">Home</a> 
          <span className="mx-2">/</span>
          <a href="/collection" className="hover:text-gray-900">Collection</a> 
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900 p">{productData.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Images Section */}
          <div className="space-y-6">
           
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={selectedImage} 
                  alt={productData.name}
                  className="w-full h-full object-contain p-4 rounded border-blue-500"  
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            {productData.image && productData.image.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {productData.image.map((img, index) => (
                  <div 
                    key={index}
                    className={`bg-white rounded-xl p-2 shadow-md cursor-pointer transition-all hover:shadow-xl border-4 ${
                      selectedImage === img ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => handleImageClick(img)}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          
          <div className="space-y-6 over">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 prata-regular">{productData.name}</h1>
              <p className="text-xl text-gray-500 mb-1">by {productData.brand}    <span className='text-gray-600 text-sm ml-4'>(Only {productData.variants.stock || 4} left) </span></p>
              
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400 text-lg">
                  {renderStars(productData.ratings?.average || 0)}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {productData.ratings?.average || 0}
                </span>
                <span className="text-sm text-gray-500">
                  ({productData.ratings?.totalReviews || 0} reviews)
                </span>

                
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{productData.pricing?.sellingPrice || 0}
                  </span>
                  {productData.pricing?.mrp > productData.pricing?.sellingPrice && (
                    <span className="text-xl text-gray-400 line-through">
                      ₹{productData.pricing?.mrp}
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

            {productData.variants && productData.variants.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {productData.variants.map((variant, index) => (
                    <button
                      key={variant.variantId || index}
                      onClick={() => handleVariantChange(variant)}
                      className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                        selectedVariant.variantId === variant.variantId
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                          : 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-md'
                      } ${variant.stock === 0 ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                      disabled={variant.stock === 0}
                    >
                      {variant.size} {variant.stock === 0 && '(Out of Stock)'}
                    </button>
                  ))}
                  {/* Available Colors */}
                  





                </div>


                <div className=''>
                    <h1 className='text-balance py-5 font-bold'>Available Colors</h1>





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
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>Free Shipping</span>
                <span>•</span>
                <span>7 Day Returns</span>
              </div>

              {/* Size Guide will be added here */}
              <div className='space-y-4 pt-6 border-t'>

              </div>




              <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-200 " onClick={() => { increaseQuantityInCart(productData) ;}}>
                  Add to Cart
                </button>
                <button className="border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 " onClick={() =>{ navigate('/cart')}}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {productData.description && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 prata-regular">Product Description</h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <p className="text-gray-700 leading-relaxed mb-4">{productData.description.long || productData.description.short}</p>
              <p className='text-gray-700 leading-relaxed mb-4'>{productData.description.short}</p>

              {/* Size and fit Guide  */}

              <div className='text-sm text-gray-500'>
                <h1>Size </h1>
                <p>{productData.sizeGuide.fitAdvice}</p>
                <p> Height : {productData.sizeGuide.modelHeight}</p>
                <p>Size : {productData.sizeGuide.modelSize}</p>
                </div>
            </div>
          </div>
        )}
      </div>
      <div>

        {/* People who bought it frequently together  */}
      </div>



      {/* I am going to add top related Products */}


      {/* Reviews of the people about this product */}


      <div>

        
      </div>



      <RelatedProduct brand = {productData.brand}/>

    </div>
  );
};

export default Product;
