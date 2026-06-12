import React ,{useState} from 'react'
import { assets } from '../assets/assets'
const Mobilefilter = ({windowSize}) => {
    const width  = windowSize.width;
    const [currShowFilter , setCurrShowFilter] = useState(false);
  return (
    <div className='flex flex-row justify-end items-center '>
        <img src = {assets.list} alt="" className='w-5 h-5 cursor-pointer' onClick={() => setCurrShowFilter(!currShowFilter)} />




    </div>
  )
}

export default Mobilefilter