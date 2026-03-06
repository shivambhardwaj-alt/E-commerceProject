import React from 'react'
import Filter from '../Components/Filter'
import RightSideFilter from '../Components/RightSideFilter'
import { assets ,winterProducts} from '../assets/assets'
import ProductItem from '../Components/ProductItem'

const Collection = () => {
  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between mb-8'>
        
        {/* Left Filter */}
        <div className='flex-1 '>
          <Filter />
        </div>

        {/* Center Heading */}

        <div className='flex flex-col items-center justify-center'>
        <div className='flex-1 flex justify-center mt-20'>
          <h1 className='text-2xl font-semibold'>Our Collection for You</h1>
        </div>

        {/* Here i will show the selected filters */}


        {/* now make cards right here  */}


        {

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 '>

            {
                winterProducts.map((item,index) => (
                 (
                  <ProductItem key  = {index} product={item}  />
                )
              ))
            }

          </div>
          
        }



        </div>

        {/* Right Side Filter */}
       

      </div>


    </div>
  )
}

export default Collection
