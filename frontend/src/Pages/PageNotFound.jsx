import React from 'react'
import {Link ,  useNavigate } from 'react-router-dom';

const PageNotFound = () => {
 const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
        <h1 className="text-6xl font-extrabold text-[#101B2D] mb-2">404</h1>
        <p className="text-lg font-semibold text-gray-800 mb-2">Page not found</p>
        <p className="text-sm text-gray-500 mb-6">
          We couldn’t find the page you were looking for. It may have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="px-5 py-3 rounded-full bg-[#D9684A] text-white font-medium hover:bg-[#C75A3D] transition"
          >
            Go to homepage
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            Go back
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Or check the URL for typos.
        </p>
      </div>
    </div>
  );
}

export default PageNotFound