import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RelatedProduct = ({ category, brand }) => {
  const { backendUrl } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/products/related-products`, {
          params: {
            category,
            brand,
          },
        });

        setRelatedProducts(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        console.log(error);
      }
    };

    if (backendUrl && (category || brand)) {
      fetchRelatedProducts();
    }
  }, [backendUrl, category, brand]);


  const nameShortener = (name) => {
    if(name.length > 20){
      return name.substring(0 , 21) + "...";
    }else{
      return name;
    }
  }
  return (
    <div className="mt-14">
      <div className="text-4xl ">
        <h1 className="mb-4 p-1 text-gray-700 font-medium prata-regular tracking-wider">
          Related Products for You
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 mt-10 ">
        {relatedProducts.map((item) => (
          <Link key={item._id} to={`/product/${item.slug}`} className="block">
            <div className="cursor-pointer">
              <div className="w-full aspect-square overflow-hidden  flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name || 'related-product'}
                  className="w-full h-full object-contain"
                />
              </div>

              
                <p className="md:text-[18px] text-[12px] text-gray-500 tracking-wide  pl-16 mt-4">
                  {(item.name) || ''}
                </p>

                <div className='flex flex-row items-center justify-between px-16 mt-2'>
                  <p className='text-gray-500 tracking-wider text-sm '>{item.color} - {item.size}</p>
                  <p className='text-gray-500 tracking-wider text-sm'>{item.brand}</p>
                  
                </div>
                <p className='text-gray-500 tracking-wide pl-16'>₹{Math.ceil(item.pricing.priceAdjustment || 0 + item.pricing.sellingPrice)} </p>
      
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;