import React from 'react'

const OrderSummaryCard = () => {

    const data = 
        {
            "name" : "Fleece Winter Season",
            "price" : 200,
            "gst" : "2%",
            "discount" : "3%",
            "quantity" : "3",

        }
    



  return (
    <div className='p-4 text-sm  text-gray-500 '>
        <p>{data.name}</p>
        <div className='flex flex-row items-center justify-between'>
            <p>price :</p>
            <p> ${data.price}</p>
        </div>
        <div className='flex flex-row items-center justify-between'>
            <p>gst:</p>
            <p> ${data.gst}</p>
        </div>
        <div className='flex flex-row items-center justify-between'>
            <p>discount:</p>
            <p> ${data.discount}</p>
        </div>
        <div className='flex flex-row items-center justify-between'>
            <p>Qty :</p>
            <p> ${data.quantity}</p>
        </div>


    </div>
  )
}

export default OrderSummaryCard