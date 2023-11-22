import React from "react";

export default function Loading() {
  return (
    <div className="animate-pulse flex flex-wrap justify-center">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((placeholder) => (
        <div key={placeholder} className="w-72 m-4">
          <div className="bg-white shadow-2xl rounded-b-3xl p-4">
            <div className="rounded-t-2xl bg-gray-200 h-40 w-full mb-4"></div>
            <div className="bg-gray-200 h-6 w-1/2 mb-2"></div>
            <div className="bg-gray-200 h-6 w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
