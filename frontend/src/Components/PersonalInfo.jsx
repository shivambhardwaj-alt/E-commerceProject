import React, { useReducer, useState } from 'react'
import { assets } from '../assets/assets';

const PersonalInfo = () => {
    const [edit, setEdit] = useState(true);
    const initialState = {
        firstName: "Shivam",
        LastName: "Bhardwaj",
        Email: "shivam63982023@gmail.com",
        Gender: "male",
        phoneNo: "+9123423423"
    }

    function reducer(state, action) {
        switch (action.type) {
            case "FIRSTNAME":
                return { ...state, firstName: action.payload }
            case "LASTNAME":
                return { ...state, LastName: action.payload }
            case "EMAIL":
                return { ...state, Email: action.payload }
            case "Gender":
                return { ...state, Gender: action.payload }
            case "PHONENO":
                return { ...state, phoneNo: action.payload }
            
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const saveHandleClick = () => {
        console.log(state);
        // code to be written here...
    }

    const profileFaqs = [
        {
            question: "How can I change my password?",
            answer: "Navigate to Security Settings, enter your current password, and set a new one."
        },
        {
            question: "How do I update my email address?",
            answer: "Open Profile Settings, enter your new email address, and verify it if required."
        },
        {
            question: "How can I change my phone number?",
            answer: "Go to Profile Settings, update your phone number, and complete OTP verification."
        },
        {
            question: "Can I edit my name after creating my account?",
            answer: "Yes, you can update your name from the Profile Information section."
        },
        {
            question: "How do I log out of all devices?",
            answer: "Open Security Settings and select 'Log Out of All Devices'."
        },
        {
            question: "How can I delete my account?",
            answer: "Go to Account Settings and choose 'Delete Account'. This action may be permanent."
        }
    ];

    // Properly track open/closed state per FAQ item
    const [openIndex, setOpenIndex] = useState(Array(profileFaqs.length).fill(false));

    const toggleFaq = (index) => {
        setOpenIndex(prev => prev.map((val, i) => (i === index ? !val : val)));
    };

    const DeleteAccount = () => {
        //code to be written
    }

    return (
        <div className={`mt-4 p-2 bg-white shadow-md min-w-full flex-row items-center justify-center ${edit}` }>
            <div className='flex flex-row items-center md:justify-start justify-center gap-5 '>
                <h1 className='text-xl prata-regular '>Personal Information</h1>
                <p className='text-blue-700 cursor-pointer' onClick={() => setEdit(!edit)}> {edit ? "Edit " : "Cancel"}</p>
            </div>
            <div className='flex flex-col gap-10 mt-2 ml-10 '>

                <div className={`grid md:grid-cols-2 lg:grid-cols-3  ${edit ? "gap-36" : "gap-1 sm:gap-3 md:gap-3 lg:gap-14 sm:gap-y-5"} `}>
                    {!edit ?
                        <div className='flex flex-row gap-4 items-center justify-start flex-1 w-full'>
                            <input
                                type="text"
                                id='firstName'
                                className='border outline-none border-gray-400 rounded-md px-4 py-2 w-full'
                                placeholder='First Name'
                                onChange={(e) => dispatch({ type: "FIRSTNAME", payload: e.target.value })}
                            />
                        </div>
                        :
                        <div className='flex flex-row gap-4 items-center justify-start mt-4 flex-1'>
                            <p>First Name : {state.firstName}</p>
                        </div>
                    }

                    {!edit ?
                        <div className='flex flex-row gap-4 items-center justify-start flex-1 w-full'>
                            <input
                                type="text"
                                id='lastName'
                                className='border outline-none border-gray-400 rounded-md px-4 py-2 w-full'
                                placeholder='Last Name'
                                onChange={(e) => dispatch({ type: "LASTNAME", payload: e.target.value })}
                            />
                        </div>
                        :
                        <div className='flex flex-row gap-4 items-center justify-start mt-4 flex-1'>
                            <p>Last Name : {state.LastName}</p>
                        </div>
                    }

                    {
                        !edit ? <div className='flex flex-row self-start gap-1 md:mr-4 mr-2'>
                            <label className='flex flex-row md:gap-1'>
                                <input type="radio" name="gender" value="male" className='cursor-pointer' onChange={(e) => dispatch({type : "GENDER" , payload : e.target.value})} checked ={state.Gender === "male"} />
                                Male
                            </label>

                            <label className='flex flex-row md:gap-1'>
                                <input type="radio" name="gender" value="female" className='cursor-pointer' onChange={(e) => dispatch({type: "GENDER" , payload : e.target.value})} checked = {state.Gender === "female"} />
                                Female
                            </label>
                        </div>
                            :
                            <div className='flex flex-row gap-4 items-center justify-start mt-4 flex-1'>
                                <p>Gender : {state.Gender}</p>
                            </div>
                    }
                </div>

                {
                    !edit ?
                        <div className='flex flex-row gap-4 items-center justify-start w-full'>
                            <input
                                type="email"
                                id='email'
                                className='border outline-none border-gray-400 rounded-md px-4 py-2 w-full'
                                placeholder='Email'
                                onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })}
                            />
                        </div>
                        :
                        <div className='flex flex-row gap-4 items-center justify-start mt-4 flex-1'>
                                <p>Email : {state.Email}</p>
                            </div>
                }

                {
                    !edit ?
                        <div className='w-full'>
                            <input
                                type="number"
                                className='border outline-none border-gray-400 rounded-md px-4 py-2 w-full'
                                placeholder='+9122344233'
                                onChange={(e) => dispatch({ type: "PHONENO", payload: e.target.value })}
                            />
                        </div>
                        :
                         <div className='flex flex-row gap-4 items-center justify-start mt-4 flex-1'>
                                <p>Mob : {state.phoneNo != undefined ? state.phoneNo : "Not Available"}</p>
                            </div>
                }

                {
                    !edit && <div>
                        <button className='text-center text-white bg-blue-500  px-4 py-2 rounded-md transition-all duration-200 hover:scale-105 hover:bg-blue-600' onClick={() => saveHandleClick()}>SAVE</button>
                    </div>
                }

                <div>
                    <h1>FAQs</h1>

                    {profileFaqs.map((faq, index) => {
                        const isOpen = openIndex[index];
                        return (
                            <div
                                key={index}
                                className='border border-gray-200 rounded-lg bg-white overflow-hidden transition-all duration-300 hover:border-blue-300 mb-2'
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(index)}
                                    className='w-full flex items-center justify-between cursor-pointer p-4 font-semibold text-gray-800 transition-colors hover:text-blue-600 text-left'
                                >
                                    <div className='flex items-center gap-2'>
                                        {faq.question}
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                    </svg>
                                </button>
                                <div className={isOpen ? "block" : "hidden"}>
                                    <p className='px-4 pb-4 text-gray-600'>
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='flex flex-col items-center justify-between'>
                    <p className='text-red-700 ml-1 transition-all duration-200 hover:underline hover:text-red-900 cursor-pointer' onClick={() => DeleteAccount()}>Delete Account</p>
                    <p className='text-gray-500 text-sm'>Your Account will be permanently delted</p>
                </div>
            </div>

        </div>
    )
}

export default PersonalInfo
