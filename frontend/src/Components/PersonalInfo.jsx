import React, { useReducer, useState } from 'react';
import { assets } from '../assets/assets';

const PersonalInfo = () => {
  const [edit, setEdit] = useState(false);

  const initialState = {
    firstName: 'Shivam',
    lastName: 'Bhardwaj',
    email: 'shivam63982023@gmail.com',
    gender: 'male',
    phoneNo: '+9123423423',
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'FIRSTNAME':
        return { ...state, firstName: action.payload };
      case 'LASTNAME':
        return { ...state, lastName: action.payload };
      case 'EMAIL':
        return { ...state, email: action.payload };
      case 'GENDER':
        return { ...state, gender: action.payload };
      case 'PHONENO':
        return { ...state, phoneNo: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const saveHandleClick = () => {
    console.log(state);
    setEdit(false);
  };

  const profileFaqs = [
    {
      question: 'How can I change my password?',
      answer: 'Navigate to Security Settings, enter your current password, and set a new one.',
    },
    {
      question: 'How do I update my email address?',
      answer: 'Open Profile Settings, enter your new email address, and verify it if required.',
    },
    {
      question: 'How can I change my phone number?',
      answer: 'Go to Profile Settings, update your phone number, and complete OTP verification.',
    },
    {
      question: 'Can I edit my name after creating my account?',
      answer: 'Yes, you can update your name from the Profile Information section.',
    },
    {
      question: 'How do I log out of all devices?',
      answer: "Open Security Settings and select 'Log Out of All Devices'.",
    },
    {
      question: 'How can I delete my account?',
      answer: "Go to Account Settings and choose 'Delete Account'. This action may be permanent.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(Array(profileFaqs.length).fill(false));

  const toggleFaq = (index) => {
    setOpenIndex((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  const DeleteAccount = () => {
    console.log('Delete account clicked');
  };

  return (
    <div className="mt-4 bg-white text-black border border-gray-200 p-6 md:min-w-[600px] lg:min-w-[700px]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold prata-regular">Personal Information</h1>
        <p
          className="text-blue-700 cursor-pointer text-sm"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'Edit' : 'Cancel'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {edit ? (
          <>
            <div className="border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">First Name</p>
              <p className="text-black">{state.firstName}</p>
            </div>

            <div className="border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Last Name</p>
              <p className="text-black">{state.lastName}</p>
            </div>

            <div className="border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Gender</p>
              <p className="text-black capitalize">{state.gender}</p>
            </div>

            <div className="border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Email</p>
              <p className="text-black break-all">{state.email}</p>
            </div>

            <div className="border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">Phone Number</p>
              <p className="text-black">{state.phoneNo}</p>
            </div>
          </>
        ) : (
          <>
            <div className="border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-2">First Name</p>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 outline-none text-black"
                value={state.firstName}
                onChange={(e) => dispatch({ type: 'FIRSTNAME', payload: e.target.value })}
              />
            </div>

            <div className="border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-2">Last Name</p>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 outline-none text-black"
                value={state.lastName}
                onChange={(e) => dispatch({ type: 'LASTNAME', payload: e.target.value })}
              />
            </div>

            <div className="border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-2">Gender</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={state.gender === 'male'}
                    onChange={(e) => dispatch({ type: 'GENDER', payload: e.target.value })}
                  />
                  Male
                </label>
                <label className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={state.gender === 'female'}
                    onChange={(e) => dispatch({ type: 'GENDER', payload: e.target.value })}
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-2">Email</p>
              <input
                type="email"
                className="w-full border border-gray-300 px-3 py-2 outline-none text-black"
                value={state.email}
                onChange={(e) => dispatch({ type: 'EMAIL', payload: e.target.value })}
              />
            </div>

            <div className="border border-gray-200 p-4 md:col-span-2">
              <p className="text-xs text-gray-500 mb-2">Phone Number</p>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 outline-none text-black"
                value={state.phoneNo}
                onChange={(e) => dispatch({ type: 'PHONENO', payload: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <button
                className="bg-black text-white px-5 py-2 text-sm hover:bg-gray-800"
                onClick={saveHandleClick}
              >
                Save Changes
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-black">FAQs</h2>

        <div className="space-y-3">
          {profileFaqs.map((faq, index) => {
            const isOpen = openIndex[index];
            return (
              <div key={index} className="border border-gray-200">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left text-black"
                >
                  <span>{faq.question}</span>
                  <span className="text-gray-500">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-4">
        <p
          className="text-red-700 cursor-pointer text-sm hover:underline"
          onClick={DeleteAccount}
        >
          Delete Account
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Your account will be permanently deleted.
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;