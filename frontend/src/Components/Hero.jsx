import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="relative w-full h-screen sm:min-h-[70vh] md:h-screen overflow-hidden">
      <img 
        src={assets.winter_banner} 
        className="w-full h-full object-cover object-center brightness-75 contrast-125 saturate-150" 
        alt="Winter Collection"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-900/40 to-black/80"></div>
  
      <div className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 xl:px-20 py-20 z-10">
        <div className="w-full max-w-4xl text-center space-y-8">
          
          <div className="w-full">
            <h1 className="prata-regular font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-tight tracking-tight mx-auto">
              <span className="block bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
                FROST
              </span>
              <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent drop-shadow-xl">
                Collection
              </span>
            </h1>
          </div>

          {/* Centered small text content */}
          <div className="w-full max-w-md mx-auto space-y-6">
            {/* Small sharp subtitle */}
            <p className="text-sm sm:text-base md:text-lg font-light text-white/95 leading-relaxed drop-shadow-lg">
              Winter's finest. Crafted for the bold.
            </p>

            {/* Small centered CTA */}
            <a 
              href="#shop"
              className="group relative inline-flex items-center px-8 py-3 backdrop-blur-xl bg-white/15 hover:bg-white/25 border-2 border-white/30 rounded-xl font-semibold text-sm sm:text-base tracking-wide text-white shadow-2xl hover:shadow-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden mx-auto block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-blue-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              <span className="relative z-10 flex items-center gap-2">
                SHOP WINTER
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
