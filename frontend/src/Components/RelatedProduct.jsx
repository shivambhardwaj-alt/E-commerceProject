import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { winterProducts } from '../assets/assets';
const RelatedProduct = ({ brand }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const winter_len = winterProducts.length;
    let products = [];
    if(winter_len > 5){
    products = winterProducts.slice(0,5).filter(item => item.brand === brand);


    }else{
        products = winterProducts.filter(item => item.brand === brand);  
    }
    setRelated(products);


  


    

  },[]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <h1 className='mb-4 p-4 text-gray-800 font-medium prata-regular'>Related Products for You</h1>
        <hr className='border-gray-400 '/>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
