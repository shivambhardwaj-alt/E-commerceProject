import React from 'react'
import { useState } from 'react';

const ShowProductInformation = ({ showInfo, setShowInfo, item }) => {
    console.log(item);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-500 ${showInfo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setShowInfo(false)}
            />

            <div
                className={`fixed top-0 right-0 z-50 h-screen w-full max-w-[500px] bg-white shadow-2xl
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${showInfo ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#DCE8F2] bg-white shrink-0">
                    <h1 className="text-xl font-semibold prata-regular text-[#16273D]">Quick Actions</h1>
                    <button
                        onClick={() => setShowInfo(false)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#DCE8F2] text-[#222831] transition-colors cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

            
                <div className="p-5 overflow-y-auto flex-1 sora">

                    
                    <div className='flex flex-row items-center justify-between gap-3'>
                        {
                            isEdit ?
                                <h1 className='prata-regular text-lg text-[#16273D]'>{item?.name}</h1>
                                :
                                <input
                                    type="text"
                                    className='flex-1 border border-[#9FB0C2] outline-none rounded-xl p-2 text-[#222831] focus:border-[#D9683A] transition-colors'
                                    placeholder='Product Name'
                                />
                        }
                        <button
                            className='border border-[#16273D] text-[#16273D] rounded-xl px-4 py-2 text-sm font-medium hover:bg-[#16273D] hover:text-white transition-colors cursor-pointer'
                            onClick={() => setIsEdit(!isEdit)}
                        >
                            Edit
                        </button>
                    </div>

                    {/* Slug + Active status */}
                    <div className='mt-2 flex items-center justify-between'>
                        <p className='text-xs jetbrains-mono text-[#9FB0C2]'>/{item?.slug}</p>
                        <span className={`text-xs jetbrains-mono px-3 py-1 rounded-full ${item?.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                            {item?.isActive ? '● Active' : '● Inactive'}
                        </span>
                    </div>

                    <div className='mt-5 grid grid-cols-3 gap-3'>
                        <div className='flex flex-col gap-1 p-3 rounded-xl bg-white border border-[#DCE8F2]'>
                            <span className='text-xs jetbrains-mono text-[#9FB0C2]'>Brand</span>
                            <span className='text-sm font-medium text-[#222831] truncate'>{item?.brand || '—'}</span>
                        </div>
                        <div className='flex flex-col gap-1 p-3 rounded-xl bg-white border border-[#DCE8F2]'>
                            <span className='text-xs jetbrains-mono text-[#9FB0C2]'>Category</span>
                            <span className='text-sm font-medium text-[#222831] truncate'>{item?.category || '—'}</span>
                        </div>
                        <div className='flex flex-col gap-1 p-3 rounded-xl bg-white border border-[#DCE8F2]'>
                            <span className='text-xs jetbrains-mono text-[#9FB0C2]'>Sub-Category</span>
                            <span className='text-sm font-medium text-[#222831] truncate'>{item?.subCategory || '—'}</span>
                        </div>
                    </div>

                  
                    <div className='mt-4 flex flex-wrap gap-2'>
                        {item?.color && (
                            <span className='px-3 py-1 border border-gray-500 rounded-3xl  BBH-Bogle text-xs jetbrains-mono'>
                                Color: {item.color}
                            </span>
                        )}
                        {item?.size && (
                            <span className='px-3 py-1 border border-gray-500 rounded-3xl  BBH-Bogle text-xs jetbrains-mono'>
                                Size: {item.size}
                            </span>
                        )}
                        {typeof item?.stock !== 'undefined' && (
                            <span className={`px-3 py-1 border border-gray-500 rounded-3xl  BBH-Bogle text-xs jetbrains-monoo ${item?.lowStock ? 'bg-red-500 text-white text-[#D9683A]' : 'bg-[#DCE8F2] text-[#16273D]'}`}>
                                Stock: {item.stock} {item?.lowStock && '⚠ Low'}
                            </span>
                        )}
                    </div>

              
                    <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4'>
                        {
                            item?.image?.map((imageUrl, index) => (
                                <div
                                    key={index}
                                    className='aspect-square  overflow-hidden flex items-center justify-center w-30 h-30 object-contain' 
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`product-image-${index}`}
                                        className='w-full h-full object-contain'
                                    />
                                </div>
                            ))
                        }
                    </div>

                    <div className='mt-10'>
                        <h2 className=' BBH-Bogle text-2xl border-b border-[#DCE8F2] pb-2'>Pricing</h2>
                        <div className='mt-4 grid grid-cols-3 gap-3'>
                            <div className='flex flex-col gap-1 p-3 rounded-xl bg-white border border-gray-300'>
                                <span className='text-xs jetbrains-mono text-[#9FB0C2] BBH-Bogle'>MRP</span>
                                <span className='text-base font-semibold text-[#222831]'>
                                    ₹{Math.ceil(item?.pricing?.mrp)}
                                </span>
                            </div>

                            <div className='flex flex-col gap-1 p-3 rounded-xl  border  border-gray-400'>
                                <span className='text-xs jetbrains-mono text-[#9FB0C2] BBH-Bogle'>Selling Price</span>
                                <span className='text-base font-semibold text-[#D9683A]'>
                                    ₹{Math.ceil(item?.pricing?.sellingPrice)}
                                </span>
                            </div>

                            <div className='flex flex-col gap-1 p-3 rounded-xl border border-gray-400'>
                                <span className='text-xs jetbrains-mono text-[#9FB0C2] BBH-Bogle'>Price Adjustment</span>
                                <span className='text-base font-semibold text-[#222831]'>
                                    ₹{Math.ceil(item?.priceAdjustment)}
                                </span>
                            </div>
                            <div className='flex flex-col gap-1 p-3 rounded-xl border border-gray-400'>
                                  <span className='text-xs jetbrains-mono text-[#9FB0C2] BBH-Bogle'>Discount Percentage</span>
                                <span className='text-base font-semibold text-[#222831]'>
                                    {item?.pricing?.discountPercentage || 0}
                                </span>
                            </div>

                             <div className='flex flex-col gap-1 p-3 rounded-xl border border-gray-400'>
                                  <span className='text-xs jetbrains-mono text-[#9FB0C2] BBH-Bogle'>Gst Percentage</span>
                                <span className='text-base font-semibold text-[#222831]'>
                                    {item?.pricing?.gstPercentage || 0}
                                </span>
                            </div>
                        </div>
                    </div>

                 
                    <div className='mt-10'>
                        <h2 className='text-lg prata-regular text-[#16273D] border-b border-[#DCE8F2] pb-2'>Shipping</h2>
                        <div className='mt-4 grid grid-cols-2 gap-3'>
                            <div className='flex flex-col gap-1 p-3 rounded-xl bg-white border border-[#DCE8F2]'>
                                <span className='text-xs jetbrains-mono text-[#9FB0C2]'>Weight</span>
                                <span className='text-sm font-medium text-[#222831]'>{item?.shipping?.weightInGrams} GMS </span>
                            </div>
                            <div className='flex flex-col gap-1 p-3 rounded-xl bg-white border border-[#DCE8F2]'>
                                <span className='text-xs jetbrains-mono text-[#9FB0C2] BBH-Bogle'>Dimensions</span>
                                <span className='text-sm font-medium text-[#222831]'>
                                   {item?.shipping?.dimensions}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Ratings */}
                    <div className='mt-10 mb-4'>
                        <h2 className='text-lg prata-regular text-[#16273D] border-b border-[#DCE8F2] pb-2'>Ratings</h2>
                        <div className='mt-4 flex items-center gap-4 p-3 rounded-xl bg-white border border-[#DCE8F2]'>
                            <span className='text-2xl font-semibold text-[#D9683A]'>
                                {item?.ratings?.average ? item.ratings.average.toFixed(1) : '0.0'}
                            </span>
                            <div className='flex flex-col'>
                               {/* here Ratings and reviews are needed to added */}
                                <span className='text-xs jetbrains-mono text-[#9FB0C2]'>
                                    {item?.ratings?.count ?? 0} review{item?.ratings?.count === 1 ? '' : 's'}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ShowProductInformation