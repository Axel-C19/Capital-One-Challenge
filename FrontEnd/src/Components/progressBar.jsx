import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-4/5 bg-gray-300 rounded-full h-4 shadow-md">
      <div
        className="bg-green-500 h-4 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      >
        <span className="text-white text-xs font-bold flex justify-center items-center">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
