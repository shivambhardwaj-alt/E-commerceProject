import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { winterProducts } from '../assets/assets';
import Filter from '../Components/Filter';
import ProductItem from '../Components/ProductItem';
import { assets } from '../assets/assets';
const BestOffers = () => {

  const [bestOffers, setBestOffers] = useState([]);
  useEffect(() => {
    const filteredItem = winterProducts.filter(item => item.pricing.discountPercentage > 0);

    const sorted = filteredItem.toSorted((a, b) => b.pricing.discountPercentage - a.pricing.discountPercentage);
    setBestOffers(sorted);

  }, [])

  // ================================FUNCTION TO HANDLE ADD TO CART======================


















  return (
    <div className="w-full px-4">
      <div className="flex gap-6">


        <div className="hidden lg:block w-72">
          <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
            <Filter />
          </div>
        </div>


        {/* CENTER CONTENT */}
        <div className="flex-1">

          {/* BANNER */}
          <div className="mt-4 p-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">

              <img
                src={assets.BestOffers}
                alt="Men's Winter Collection"
                className="w-full h-[260px] md:h-[320px] lg:h-[380px]
                              object-cover scale-105 group-hover:scale-110
                              transition-transform duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-r
                                 from-black/80 via-black/40 to-transparent" />

              <div className="absolute inset-0 " />

              <div className="absolute inset-0 flex flex-col items-end justify-center px-6 md:px-12 text-white">
                <span className="inline-block mb-3 w-fit px-4 py-1 text-xs md:text-sm
                                    rounded-full bg-white/20 backdrop-blur-md
                                    border border-white/30 tracking-wide prata-regular self-center">
                  BEST OFFERS
                </span>

                <h1 className="max-w-xl text-3xl md:text-4xl lg:text-5xl font-extrabold
                                  leading-tight tracking-tight drop-shadow-xl ml-2 prata-regular">
                   Limited time deals on jackets, hoodies & more
                </h1>

                <p className="mt-4 max-w-md text-sm md:text-base text-gray-200 prata-regular">
                  Premium jackets, hoodies & winter essentials crafted for comfort,
                  warmth and confidence.
                </p>

                <button
                  className="mt-6 w-fit px-6 py-3 rounded-full
                                bg-white text-black font-semibold
                                hover:bg-black hover:text-white
                                transition-all duration-300 shadow-lg prata-regular"
                >
                  Explore Collection →
                </button>
              </div>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                             gap-3 mt-10">
            {bestOffers.map((item, index) => (
              <ProductItem key={index} product={item} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default BestOffers