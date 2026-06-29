import React from 'react';
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import LatestCollection from '../Components/LatestCollection.jsx';
import BestSeller from '../Components/BestSeller.jsx';
import Faqs from '../Components/Faqs.jsx'

const Collection = () => {
  const navigate = useNavigate();

  const featuredBrands = [
    'NorthLoom',
    'SnowPeak Studios',
    'Alpine Drift',
    'Therma Lane',
    'HiberNest',
    'ColdVale',
    'Aurelle',
    'Velvora',
    'Luminor',
    'Maison Vale',
    'Frost & Thread',
    'WinterHaus',
  ];

  return (
    <div className="bg-[#F7F5F2] text-black">
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-2xl">
            <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-gray-500">
              Premium Winterwear
            </p>

            <h1 className="mt-4 text-5xl md:text-7xl font-semibold leading-tight">
              Our Collection
            </h1>

            <h2 className="mt-2 text-3xl md:text-5xl prata-regular text-gray-700">
              For You
            </h2>

            <p className="mt-6 text-base md:text-lg text-gray-700 max-w-xl leading-7">
              Discover premium winter clothing crafted for comfort, warmth, and everyday elegance.
              Simple silhouettes, refined details, and a timeless feel built for the cold season.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/shop/sale')}
                className="bg-black text-white px-6 py-3 text-sm md:text-base hover:bg-gray-800 transition"
              >
                Browse Now
              </button>
              <button
                onClick={() => navigate('/collection')}
                className="border border-black px-6 py-3 text-sm md:text-base hover:bg-black hover:text-white transition"
              >
                View Collection
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
              <div className="border border-gray-200 bg-white p-4">
                <p className="text-2xl font-semibold">01</p>
                <p className="text-sm text-gray-600 mt-1">Premium edits</p>
              </div>
              <div className="border border-gray-200 bg-white p-4">
                <p className="text-2xl font-semibold">02</p>
                <p className="text-sm text-gray-600 mt-1">Winter comfort</p>
              </div>
              <div className="border border-gray-200 bg-white p-4">
                <p className="text-2xl font-semibold">03</p>
                <p className="text-sm text-gray-600 mt-1">Clean styling</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="border border-gray-200 bg-white p-3 md:p-4">
              <img
                src={assets.second}
                alt="Winter collection"
                className="w-full h-[580px] object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 md:-left-6 bg-black text-white px-5 py-3 border border-black">
              <p className="text-xs uppercase tracking-[0.3em]">New Season</p>
              <p className="text-lg font-semibold mt-1">Winter Essentials</p>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src={assets.first}
              alt="Fashion display"
              className="w-full h-[780px] object-cover border border-gray-200 bg-white p-3"
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
              Featured Brands
            </p>
            <h3 className="mt-3 text-3xl md:text-4xl font-semibold">
              A curated winter lineup
            </h3>
            <p className="mt-4 text-gray-700 leading-7 max-w-lg">
              A premium selection of winter-focused brand names and edits designed to feel refined,
              modern, and easy to trust.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {featuredBrands.map((brand, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 px-4 py-3 text-sm md:text-base text-center hover:border-black transition"
                >
                  {brand}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center md:justify-start">
              <button className="text-lg border border-gray-700 px-6 py-2 hover:bg-black hover:text-white transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8  ">
        <div className="max-w-4xl mx-auto py-20">
          <h1 className="text-6xl text-center font-semibold mb-16">
            Our Journey
          </h1>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-10 w-[2px] bg-gray-300"></div>

            <div className="relative pl-14 mb-12">
              <div className="absolute left-0 top-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                2024
              </div>
              <div className="bg-white border p-6">
                <h2 className="text-xl font-semibold">Brand Started</h2>
                <p className="text-gray-600 mt-2">
                  Started our journey with premium winter clothing.
                </p>
              </div>
            </div>

            <div className="relative pl-14 mb-12">
              <div className="absolute left-0 top-2 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                2025
              </div>
              <div className="bg-white border p-6">
                <h2 className="text-xl font-semibold">Premium Collection</h2>
                <p className="text-gray-600 mt-2">
                  Expanded into luxury winter collections.
                </p>
              </div>
            </div>

            <div className="relative pl-14 mb-12">
              <div className="absolute left-0 top-2 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                2026
              </div>
              <div className="bg-white border p-6">
                <h2 className="text-xl font-semibold">Currently Working</h2>
                <p className="text-gray-600 mt-2">
                  Dedicated to Frost Collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
          
              <Faqs />
      </div>






    </div>
  );
};

export default Collection;