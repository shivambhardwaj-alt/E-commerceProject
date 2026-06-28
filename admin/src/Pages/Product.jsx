  import React, { useEffect, useReducer, useState, useMemo } from 'react'
  import AddProduct from '../components/AddProduct'
  import { assets, products } from '../assets/assets'
  import { useSearchParams } from 'react-router-dom';
  import axios from 'axios';
  import { adminContext } from '../context/AdminContext';
  import { useContext } from 'react';
  import Loading from './Loading.jsx';
  import ShowProductInformation from '../components/ShowProductInformation';

  const Product = () => {
    const initialState = { search: "", isFocused: false }


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const { backendUrl } = useContext(adminContext);
    const [loading, setLoading] = useState(false);
    const [showInfo ,setShowInfo] = useState(false);
    const[currentItem,setCurrentItem] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams()

    let page = Number(searchParams.get("page") || 1);

    const buttonValues = [];
    const [newbuttonValues, setNewButtonValues] = useState(buttonValues);

    useEffect(() => {
      
      const start = Math.max(1, currentPage - 2);
      const arr = Array.from({ length: 6 }, (_, i) => start + i);
      setNewButtonValues(arr);
     
    }, [currentPage]);







    const reducer = (state, action) => {
      switch (action.type) {
        case "SET_SEARCH": return { ...state, search: action.payload }
        case "SET_FOCUSED": return { ...state, isFocused: action.payload }
        case "INCREASING": { increasingHandleClick(); return state }
        case "DECREASING": { decreasingHandleClick(); return state }
        default: return state
      }
    }

    const increasingHandleClick = () => {

      if (newbuttonValues[0] + 1 > 0 && newbuttonValues[5] + 1 < totalPages + 5) {
        let temp = newbuttonValues.slice();
        for (let i = 0; i < 6; i++) {
          temp[i]++;
        }
        setNewButtonValues(temp);
      }

        ;



    }
    const decreasingHandleClick = () => {
  
      if (newbuttonValues[0] - 1 >= 1) {
        let temp = newbuttonValues.slice();
        for (let i = 0; i < 6; i++)temp[i]--;
        setNewButtonValues(temp);

      }
    

    }


    // css for the button

    const pageButtons = newbuttonValues.slice(0, 5);

    const buttonClass = (num) =>
      `flex items-center justify-center active:scale-95 w-9 md:w-10 h-7 md:h-10 aspect-square border border-gray-200 rounded-md transition-all
    ${num > totalPages ? 'cursor-not-allowed opacity-40 bg-gray-100 text-gray-700 border-gray-700' : ''}
    ${page === num ? 'bg-indigo-500 text-white ' : 'bg-white border-gray-200'}`;



    const [state, dispatch] = useReducer(reducer, initialState)
    const { isFocused, search } = state

    //==================== temporary Search bar for this page ========================================
    const filteredData = useMemo(() => {
      if (!search.trim()) return products;

      return products.filter((product) =>
        Object.values(product).some((value) =>
          String(value)
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      );
    }, [products, search]);





    const [productData, setProductData] = useState([]);
   useEffect(() => {
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/products/get-all-products`, {
        params: { page: page }
      });

      setProductData(data.product.docs);
      setCurrentPage(data.product.page);
      setTotalPages(data.product.totalPages);
      setHasNextPage(data.product.hasNextPage);
      setHasPrevPage(data.product.hasPrevPage);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  fetchAllProducts();
}, [page])



    return (



      loading ? <Loading /> :
        <div className='px-4 py-2'>
          {/* Header row */}
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mt-1 w-full'>
            <div>
              <h1 className='text-lg font-semibold'>Products</h1>
              <p className='text-sm text-gray-500'>Detailed information about your store</p>
            </div>

            <div className='flex items-center gap-3'>
              {/* Search */}
              <div className={`flex items-center gap-2 pl-3 transition-all duration-300 rounded-full bg-white
                ${isFocused ? 'border-2 border-blue-500 h-10' : 'border border-gray-300 h-9'} w-52`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 30 30" fill="#9CA3AF">
                  <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                  onFocus={() => dispatch({ type: 'SET_FOCUSED', payload: true })}
                  onBlur={() => dispatch({ type: 'SET_FOCUSED', payload: false })}
                  className='w-full h-full bg-transparent text-sm outline-none placeholder-gray-400'
                />
              </div>


              {/* Settings */}
              <img src={assets.settings} alt="Settings" className='h-5 w-5 cursor-pointer' />

              <AddProduct />


            </div>
          </div>



          {/* Table section */}
          <div className="mt-5 w-full border border-gray-200 rounded-xl overflow-hidden relative">
          
              <ShowProductInformation showInfo = {showInfo} setShowInfo={setShowInfo} item={currentItem}  />

            
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-sm font-semibold">Your Store</h2>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[700px] text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 text-left">Product</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 text-left">Category</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 text-center">Price</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 text-center">Rating</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 text-center">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {productData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs text-gray-700 font-medium">{item.name}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{item.category}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 text-center"><span className='flex flex-col items-center justify-between'><span className='text-xs'>{item.pricing.currency === "INR" ? "₹" : "$"}{Math.ceil(item.pricing.sellingPrice + item.priceAdjustment)}</span>
                        <span className='text-xs line-through'>{item.pricing.currency === "INR" ? "₹" : "$"}{Math.ceil(item.pricing.mrp)}</span>

                      </span></td>
                      <td className="px-4 py-3 text-xs text-gray-600 text-center">{item.ratings.average}</td>
                      <td className="px-4 py-3 text-xs text-center">
                        <div className='flex flex-col items-center justify-center'>
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium
      ${item.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {item.isActive ? "Active" : "Inactive"}
                          </span>
                          {item.lowStock && (
                            <span className="mt-1  text-[10px] text-gray-500  py-1 border rounded-xl px-1 ">
                              <span className='text-[12px] lowercase'>({item.stock})</span>Low Stock
                            </span>
                          )}

                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          <img src={assets.more} alt="more" className="w-5 h-5 cursor-pointer" onClick={() => {setCurrentItem(item) ;setShowInfo(!showInfo)}} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* pagination */}

          <div className='flex flex-row items-center justify-end mt-16'>
            <div class="flex items-center gap-2 ">
              <button type="button" disabled={!hasPrevPage} aria-label="Previous" class={`mr-4 cursor-pointer ${hasPrevPage ? "" : "disabled:cursor-not-allowed "}`} onClick={() => { dispatch({ type: "DECREASING", payload: "NONE" }); (page - 1) >= 1 && setSearchParams({ page: String(page - 1) }) }}>
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 1L2 9.24242L11 17" stroke="#111820" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" />
                </svg>
              </button>

              <div className="flex gap-2 text-gray-500 text-sm md:text-base">
                {pageButtons.map((num) => (
                  <button
                    key={num}
                    type="button"
                    disabled={num > totalPages}
                    onClick={() => setSearchParams({ page: String(num) })}
                    className={buttonClass(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button type="button" disabled={!hasNextPage} aria-label="Next" class={`ml-4 cursor-pointer ${hasNextPage ? "" : "disabled:cursor-not-allowed"}`} onClick={() => { dispatch({ type: "INCREASING", payload: "NONE" }); (totalPages >= (page + 1)) && setSearchParams({ page: String(page + 1) }) }}>
                <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L10 9.24242L1 17" stroke="#111820" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round" />
                </svg>
              </button>
            </div>
          </div>




        </div>
    )
  }

  export default Product