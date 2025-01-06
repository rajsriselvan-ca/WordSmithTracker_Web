import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center mt-4">
        <p className="mr-3">Loading Please Wait</p>
      <div className="loader w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
