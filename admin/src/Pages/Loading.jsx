import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center">
        <div className="w-16 h-16 border-[5px] border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

        <h2 className="mt-5 text-lg font-semibold text-gray-800">
          Loading
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Please wait a moment...
        </p>

        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;