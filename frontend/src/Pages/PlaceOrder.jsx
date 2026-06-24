import React, { useReducer } from 'react';
import { assets } from '../assets/assets';
import CountrySelect from '../Components/CountrySelect';
import StateSelect from '../Components/StateSelect';

const PlaceOrder = () => {
  const initialState = {
    defaultAddress: "Home",
    phone: "",
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    Pincode: "",
    Country: "",
    State: "",
    Instruction: "",
    Coupon: "",
    DeliveryMethod: "CashOnDelivery",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "PHONE":
        return { ...state, phone: action.payload };
      case "DEFAULTADDRESS":
        return { ...state, defaultAddress: action.payload };
      case "ADDRESSLINE1":
        return { ...state, AddressLine1: action.payload };
      case "ADDRESSLINE2":
        return { ...state, AddressLine2: action.payload };
      case "CITY":
        return { ...state, City: action.payload };
      case "PINCODE":
        return { ...state, Pincode: action.payload };
      case "STATE":
        return { ...state, State: action.payload };
      case "COUNTRY":
        return { ...state, Country: action.payload };
      case "INSTRUCTION":
        return { ...state, Instruction: action.payload };
      case "COUPON":
        return { ...state, Coupon: action.payload };

      case "DELIVERYMETHOD":
        return { ...state, DeliveryMethod: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const orderSummary = [
    {
      id: 1,
      name: "Alpine Shell Jacket",
      brand: "Winter-X",
      size: "M",
      color: "Black",
      quantity: 1,
      price: 2499,
    },
    {
      id: 2,
      name: "Nordic Scarf & Glove Set",
      brand: "PolarKnit",
      size: "One Size",
      color: "Navy",
      quantity: 2,
      price: 1798,
    },
    {
      id: 3,
      name: "Fleece-lined Gloves Pro",
      brand: "FrostGear",
      size: "L",
      color: "Grey",
      quantity: 1,
      price: 899,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  const total = orderSummary.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-10 md:p-14">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex flex-row gap-1 items-center">
            <img src={assets.location} alt="" className="w-8 h-8" />
            <h1 className="uppercase tracking-wide text-xl prata-regular">
              Delivery Address
            </h1>
          </div>

          <h3 className='text-xl px-10 font-normal prata-regular mt-4 text-gray-600 tracking-wide'>
            Manage where your order will be delivered</h3>
          


          <form
            onSubmit={handleSubmit}
            className="mt-10 border rounded-xl p-10 md:min-w-[600px]"
          >
            <div className="flex flex-row gap-2 flex-wrap">
              <div
                className={`flex flex-row items-center gap-1 ${state.defaultAddress === "Home"
                    ? "border-b-2 border-blue-700"
                    : "border border-gray-400"
                  } rounded-xl px-2 py-1 text-sm cursor-pointer`}
                onClick={() => dispatch({ type: "DEFAULTADDRESS", payload: "Home" })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="14"
                  height="14"
                >
                  <path d="M3 11.5L12 4l9 7.5" />
                  <path d="M5 10.5V20h14v-9.5" />
                  <path d="M9 20v-6h6v6" />
                </svg>
                <p>Home</p>
              </div>

              <div
                className={`flex flex-row items-center gap-1 ${state.defaultAddress === "Work"
                    ? "border-b-2 border-blue-700"
                    : "border border-gray-400"
                  } rounded-xl px-2 py-1 text-sm cursor-pointer`}
                onClick={() => dispatch({ type: "DEFAULTADDRESS", payload: "Work" })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 4a2 2 0 0 0-2 2v1H6a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3h-2V6a2 2 0 0 0-2-2h-4zm0 2h4v1h-4V6zm-4 3h12a1 1 0 0 1 1 1v2H5v-2a1 1 0 0 1 1-1zm-1 5h14v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-5z" />
                </svg>
                <p>Work</p>
              </div>

              <div
                className={`flex flex-row items-center gap-1 ${state.defaultAddress === "New"
                    ? "border-b-2 border-blue-700"
                    : "border border-gray-400"
                  } rounded-xl px-2 py-1 text-sm cursor-pointer`}
                onClick={() => dispatch({ type: "DEFAULTADDRESS", payload: "New" })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 5a1 1 0 0 1 2 0v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1-2 0v-6H5a1 1 0 0 1 0-2h6V5z" />
                </svg>
                <p>Add New</p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4">
              <label htmlFor="phone" className="text-gray-500 tracking-wider">Phone</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={10}
                className="outline-none border-b border-b-gray-400 no-spinner"
                value={state.phone}
                onChange={(e) => dispatch({ type: "PHONE", payload: e.target.value })}
                required
              />

              <label htmlFor="line1" className="text-gray-600 tracking-wider">Address Line 1</label>
              <input
                type="text"
                id="line1"
                className="outline-none border-b border-b-gray-500 transition-all duration-200"
                value={state.AddressLine1}
                onChange={(e) => dispatch({ type: "ADDRESSLINE1", payload: e.target.value })}
                required
              />

              <label htmlFor="line2" className="text-gray-600 tracking-wider">
                Address Line 2 <span className="text-xs">(optional)</span>
              </label>
              <input
                type="text"
                id="line2"
                className="outline-none border-b border-b-gray-500 transition-all duration-200"
                value={state.AddressLine2}
                onChange={(e) => dispatch({ type: "ADDRESSLINE2", payload: e.target.value })}
              />

              <label htmlFor="city" className="text-gray-600 tracking-wider">City</label>
              <input
                type="text"
                id="city"
                className="outline-none border-b border-gray-500"
                required
                value={state.City}
                onChange={(e) => dispatch({ type: "CITY", payload: e.target.value })}
              />

              <label htmlFor="pincode" className="text-gray-600 tracking-wider">Pincode</label>
              <input
                type="text"
                id="pincode"
                inputMode="numeric"
                maxLength={6}
                className="outline-none border-b border-gray-500 no-spinner"
                required
                value={state.Pincode}
                onChange={(e) => dispatch({ type: "PINCODE", payload: e.target.value })}
              />

              <CountrySelect
                country={state.Country}
                onChange={(e) => dispatch({ type: "COUNTRY", payload: e.target.value })}
              />
              <StateSelect
                state={state.State}
                onChange={(e) => dispatch({ type: "STATE", payload: e.target.value })}
              />

              <label htmlFor="coupon" className="text-gray-500 tracking-wider">Coupon Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="coupon"
                  value={state.Coupon}
                  onChange={(e) => dispatch({ type: "COUPON", payload: e.target.value })}
                  className="flex-1 outline-none border-b border-b-gray-500 transition-all duration-200"
                  placeholder="Enter coupon code"
                />
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:scale-105 transition-all duration-200"
                >
                  Apply
                </button>
              </div>
              {/* Delivery method here */}
              <p>Delivery Method</p>

              <div className='flex flex-row items-center justify-start gap-10'>
                <div className='' className='flex flex-row gap-1 border px-3 py-2 cursor-pointer max-w-[150px]' onClick={() => dispatch({ type: "DELIVERYMETHOD", payload: "StripePay" })} >
                  <p className={`${state.DeliveryMethod === "StripePay" ? "bg-gray-900 px-3 rounded-2xl" : ""} `}></p>
                  <img src={assets.stripe_logo} alt="stripe" className='w-30 h-10' />

                </div>
                <div onClick={() => dispatch({ type: "DELIVERYMETHOD", payload: "RazorPay" })} className='flex flex-row gap-1 border px-3 py-2 cursor-pointer min-w-[150px]'>
                  <p className={`${state.DeliveryMethod === "RazorPay" ? "bg-gray-900 px-2 rounded-xl" : ""}`}></p>
                  <img src={assets.razorpay_logo} alt="" className='w-24 h-10' />
                </div>
                <div onClick={() => dispatch({ type: "DELIVERYMETHOD", payload: "CashOnDelivery" })} className='flex flex-row gap-1 border px-3 py-2 cursor-pointer min-w-[150px] min-h-[30px]'>
                  <p className={`${state.DeliveryMethod === "CashOnDelivery" ? "bg-gray-900 px-2  rounded-2xl" : ""} `}></p>
                  <p>Cash On Delivery</p>
                </div>

              </div>

              <label htmlFor="delivery-ins" className="text-gray-500 tracking-wider">
                Delivery Instruction
              </label>
              <textarea
                name="delivery-ins"
                id="delivery-ins"
                placeholder="delivery Instruction (10-60)"
                className="text-gray-500 text-sm mt-10 rounded-lg md:min-w-[400px] lg:min-h-[100px] outline-none border-b border-gray-800"
                maxLength={60}
              ></textarea>

              <button
                type="submit"
                className="mt-7 bg-black text-white rounded-xl p-2 transition-all duration-200 hover:scale-105"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-[380px] p-10 mt-[115px] border rounded-xl h-fit ">
          <h1 className="text-xl font-semibold mb-6">Order Summary</h1>

          <div className="flex flex-col gap-4">
            {orderSummary.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-4 border-b pb-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.brand} • {item.size} • Qty {item.quantity}
                  </p>
                  <p className="text-xs text-gray-500">Color: {item.color}</p>
                </div>
                <p className="font-semibold text-gray-900">${item.price}</p>
              </div>
            ))}

            <div className="pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;