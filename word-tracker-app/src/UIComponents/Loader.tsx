import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <p className="text-center sm:text-left">Loading, please wait...</p>
        <div className="loader w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-2 text-sm text-gray-600 text-center max-w-[300px] sm:max-w-none">
        Since this app is hosted on a free platform, the server may take a few moments to wake up from inactivity.
      </p>
    </div>
  );
};

export default Loader;