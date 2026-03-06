import React from 'react'
import { assets } from '../assets/assets';
import PriceFilter from './PriceFilter';

const Filter = () => {

    const toggleCategory = (e) => {
        const value = e.target.value;
        console.log(value);
    }

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        console.log(value);
    }

    const toggleProductType = (e) => {
        const value = e.target.value;
        console.log(value);
    }

    const toggleBrand = (e) => {
        const value = e.target.value;
        console.log(value);
    }

    const toggleSize = (e) => {
        const value = e.target.value;
        console.log(value);
    }

    const changeColor = (e) => {
        const value = e.target.value;
        console.log(value);
    }

    const changeDiscount = (e) => {
        const value = e.target.value;
        console.log(value);
    }   

    const changeRatingType = (e) => {
        const value = e.target.value;
        console.log(value);
    }

    const allProducts = assets.winterProducts;

    return (
        <div className='max-w-72  hidden sm:block border border-r-1 '>
            {/* FILTER HEADING */}
            <h2 className='text-lg font-semibold mb-5 p-2 prata-regular'>Filters</h2>

            {/* Categories */}
            <div className='border border-gray-300 pl-5 py-3 my-5 sm:block'>
                <p className='mb-3 text-sm font-medium prata-regular'>CATEGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <label htmlFor="category-men" className='flex gap-2'>
                        <input type="checkbox" id="category-men" className='w-3' value='Men' onChange={toggleCategory} />
                        Men
                    </label>
                    <label htmlFor="category-women" className='flex gap-2'>
                        <input type="checkbox" id="category-women" className='w-3' value='Women' onChange={toggleCategory} />
                        Women
                    </label>
                    <label htmlFor="category-kids" className='flex gap-2'>
                        <input type="checkbox" id="category-kids" className='w-3' value='Kids' onChange={toggleCategory} />
                        Kids
                    </label>
                </div>
            </div>

            {/* Subcategories */}
            <div className='border border-gray-300 pl-5 py-3 my-5 sm:block'>
                <p className='mb-3 text-sm font-medium prata-regular'>SUB CATEGORIES</p>

                <label htmlFor="subcategory-topwear" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="subcategory-topwear" className='w-3' value='TopWear' onChange={toggleSubCategory} />
                    TopWear
                </label>

                <label htmlFor="subcategory-bottomwear" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="subcategory-bottomwear" className='w-3' value='BottomWear' onChange={toggleSubCategory} />
                    BottomWear
                </label>

                <label htmlFor="subcategory-outerwear" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="subcategory-outerwear" className='w-3' value='OuterWear' onChange={toggleSubCategory} />
                    OuterWear
                </label>
            </div>

            {/* Product Type */}
            <div className='border border-gray-300 pl-5 py-3 my-5 sm:block'>


                <p className='mb-3 text-sm font-medium prata-regular'>TYPE</p>
                <label htmlFor="producttype-tshirt" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="producttype-tshirt" className='w-3' value='T-Shirt' onChange={toggleProductType} />
                    T-Shirt
                </label>

                <label htmlFor="producttype-sweater" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="producttype-sweater" className='w-3' value='Sweater' onChange={toggleProductType} />
                    Sweater
                </label>

                <label htmlFor="producttype-jacket" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="producttype-jacket" className='w-3' value='Jacket' onChange={toggleProductType} />
                    Jacket
                </label>

                <label htmlFor="producttype-hoodie" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="producttype-hoodie" className='w-3' value='Hoodie' onChange={toggleProductType} />
                    Hoodie
                </label>
            </div>

            {/* Price Slider */}
            <PriceFilter />

            {/* Brand */}
            <div className='border border-gray-300 pl-5 py-3 my-5 sm:block'>


                <p className='mb-3 text-sm font-medium prata-regular'>BRAND</p>
                <label htmlFor="brand-nike" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="brand-nike" className='w-3' value='Nike' onChange={toggleBrand} />
                    Nike
                </label>

                <label htmlFor="brand-adidas" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="brand-adidas" className='w-3' value='Adidas' onChange={toggleBrand} />
                    Adidas
                </label>

                <label htmlFor="brand-puma" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="brand-puma" className='w-3' value='Puma' onChange={toggleBrand} />
                    Puma
                </label>
            </div>

            {/* Size */}
            <div className='border border-gray-300 pl-5 py-3 my-5 sm:block'>

                <p className='mb-3 text-sm font-medium prata-regular'>SIZE</p>
                <label htmlFor="size-s" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="size-s" className='w-3' value='S' onChange={toggleSize} />
                    S
                </label>

                <label htmlFor="size-m" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="size-m" className='w-3' value='M' onChange={toggleSize} />
                    M
                </label>

                <label htmlFor="size-l" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="size-l" className='w-3' value='L' onChange={toggleSize} />
                    L
                </label>

                <label htmlFor="size-xl" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="size-xl" className='w-3' value='XL' onChange={toggleSize} />
                    XL
                </label>
            </div>

            {/* Color */}
            <div className='border border-gray-300 pl-5 py-3 my-5 sm:block'>

                <p className='mb-3 text-sm font-medium prata-regular'>COLOR</p>
                <label htmlFor="color-red" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="color-red" className='w-3' value='Red' onChange={changeColor} />
                    Red
                </label>

                <label htmlFor="color-black" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="color-black" className='w-3' value='Black' onChange={changeColor} />
                    Black
                </label>

                <label htmlFor="color-blue" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="color-blue" className='w-3' value='Blue' onChange={changeColor} />
                    Blue
                </label>

                <label htmlFor="color-white" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="color-white" className='w-3' value='White' onChange={changeColor} />
                    White
                </label>
            </div>

            {/* Discount */}
            <div className='border border-gray-300 pl-5 py-3 my-5 sm:block'>
                <p className='mb-3 text-sm font-medium prata-regular'>DISCOUNT</p>
                <label htmlFor="discount-10" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="discount-10" className='w-3' value='10+' onChange={changeDiscount} />
                    10+
                </label>

                <label htmlFor="discount-30" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="discount-30" className='w-3' value='30+' onChange={changeDiscount} />
                    30+
                </label>

                <label htmlFor="discount-50" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="discount-50" className='w-3' value='50+' onChange={changeDiscount} />
                    50+
                </label>
            </div>

            {/* Ratings */}
            <div className='border border-gray-300 pl-5 py-3 my-5 sm:block'>
                <p className='mb-3 text-sm font-medium prata-regular'>RATINGS</p>
                <label htmlFor="rating-4" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="rating-4" className='w-3' value='4+' onChange={changeRatingType} />
                    4+
                </label>

                <label htmlFor="rating-3" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="rating-3" className='w-3' value='3+' onChange={changeRatingType} />
                    3+
                </label>

                <label htmlFor="rating-2" className='flex gap-2 text-sm font-light text-gray-700'>
                    <input type="checkbox" id="rating-2" className='w-3' value='2+' onChange={changeRatingType} />
                    2+
                </label>
            </div>
        </div>
    )
}

export default Filter;
