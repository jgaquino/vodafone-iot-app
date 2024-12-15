import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 bg-[rgba(255,255,255,.6)] bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
