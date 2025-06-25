import React from 'react';

const CarCardSkeleton = () => {
  return (
    <div>
      <div className="card bg-base-100 shadow-lg rounded-2xl overflow-hidden border border-gray-200/50">
        {/* Image Placeholder */}
        <div className="bg-base-200 h-56 w-full animate-pulse"></div>
        <div className="card-body p-5">
          {/* Title Placeholder */}
          <div className="h-6 w-3/4 rounded bg-base-200 animate-pulse mb-3"></div>
          {/* Location Placeholder */}
          <div className="h-4 w-1/2 rounded bg-base-200 animate-pulse mb-2"></div>
          {/* Date Placeholder */}
          <div className="h-3 w-1/3 rounded bg-base-200 animate-pulse mt-2"></div>
          <div className="card-actions justify-between items-center mt-4">
            {/* Price Placeholder */}
            <div className="h-7 w-1/4 rounded bg-base-200 animate-pulse"></div>
            {/* Button Placeholder */}
            <div className="h-12 w-32 rounded-full bg-base-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCardSkeleton;
