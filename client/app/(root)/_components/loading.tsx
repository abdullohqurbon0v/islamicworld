import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-emerald-900 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-2 bg-gray-100 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-600 animate-pulse">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 .587l3.668 7.431 8.167.952-5.916 5.767 1.396 8.132L12 19.897l-7.315 3.852 1.396-8.132L.165 9.97l8.167-.952L12 .587z" />
            </svg>
          </div>
        </div>
        <p className="text-lg font-semibold text-emerald-900 font-[ArabicFont] animate-pulse">
          Yuklanmoqda...
        </p>
      </div>
    </div>
  );
};

export default Loading;
