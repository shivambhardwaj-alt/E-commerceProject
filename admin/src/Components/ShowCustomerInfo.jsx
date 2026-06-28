import React from 'react';

const ShowCustomerInfo = ({ showInfo, setShowInfo, User }) => {
    return (
        <>
            <div
                className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-500 ${showInfo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setShowInfo(false)}
            />

            <div
                className={`fixed top-0 right-0 z-50 h-screen w-full max-w-[400px] bg-white shadow-2xl
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${showInfo ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#DCE8F2] bg-white shrink-0">
                    <h1 className="text-xl font-semibold prata-regular text-[#16273D]">User Profile</h1>
                    <button
                        onClick={() => setShowInfo(false)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#DCE8F2] text-[#222831] transition-colors cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto px-5 py-6">
                    <div className="flex items-center gap-3">
                        <span className="w-12 h-12 flex items-center justify-center text-white bg-gray-900 rounded-xl">
                            {User?.name?.[0] || '?'}
                        </span>

                        <div>
                            <h2 className="text-2xl text-gray-800 prata-regular">{User?.name || 'Unknown User'}</h2>
                            <p className="text-sm text-gray-500">Customer profile details</p>
                        </div>
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${User?.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {User?.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                        <p className="text-xs uppercase tracking-wider text-gray-400">Email</p>
                        <p className="mt-1 text-gray-800">{User?.email || '-'}</p>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3">
                        <div className="rounded-2xl border border-gray-200 bg-white p-3">
                            <p className="text-xs text-gray-400">City</p>
                            <p className="mt-1 text-sm font-medium text-gray-700">{User?.city || '-'}</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-3">
                            <p className="text-xs text-gray-400">State</p>
                            <p className="mt-1 text-sm font-medium text-gray-700">{User?.state || '-'}</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-3">
                            <p className="text-xs text-gray-400">Country</p>
                            <p className="mt-1 text-sm font-medium text-gray-700">{User?.country || '-'}</p>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-gray-200 bg-white p-4">
                            <p className="text-sm text-gray-500">Total Orders</p>
                            <p className="mt-2 text-3xl font-semibold text-gray-900">{User?.totalOrders ?? 0}</p>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-4">
                            <p className="text-sm text-gray-500">Last Order Amount</p>
                            <p className="mt-2 text-2xl font-semibold text-gray-900">{User?.lastOrderAmount || '-'}</p>
                        </div>
                    </div>

                    <button className='bg-gray-700 mt-8 ml-2 rounded-xl px-4 py-2 text-white transition-all duratio-200 hover:scale-105 cursor-pointer' >DeleteUser</button>
                </div>
            </div>
        </>
    );
};

export default ShowCustomerInfo;