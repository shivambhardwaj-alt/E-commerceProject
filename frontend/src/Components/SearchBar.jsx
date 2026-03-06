import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState(search); // for debouncing

  // Determine visibility based on route
  useEffect(() => {
    const isVisiblePath = location.pathname.startsWith('/collection');
    setVisible(isVisiblePath);
  }, [location]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue);
    }, 300); // Adjust delay as needed

    return () => clearTimeout(handler);
  }, [inputValue]);

  if (!(showSearch && visible)) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-11/12 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm focus:ring focus:ring-blue-300"
          value={inputValue}
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search"
          aria-label="Search input"
        />
        <img className="w-5 ml-2" src={assets.search_icon} alt="Search icon" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-4 cursor-pointer"
        src={assets.cross_icon}
        alt="Close search bar"
        title="Close"
      />
    </div>
  );
};

export default SearchBar;
