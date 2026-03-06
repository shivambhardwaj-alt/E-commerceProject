import { useState } from "react";

const PriceFilter = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  console.log("Price Range:", minPrice, maxPrice);

  return (
    <div className="border p-4 w-72">
      <h3 className="font-medium mb-3 prata-regular">Price</h3>

      {/* Display */}
      <p className="text-sm mb-3">
        ₹{minPrice} - ₹{maxPrice}
      </p>

      {/* Min Slider */}
      <input
        type="range"
        min="0"
        max="10000"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        className="w-full mb-3"
      />

      {/* Max Slider */}
      <input
        type="range"
        min="0"
        max="10000"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default PriceFilter;
