import React from 'react';
import Skeleton from '@mui/material/Skeleton';

function MovieCardSkeleton() {
  return (
    <div className="w-1/4 px-2 mb-10">
      <div className="cursor-pointer">
        <div
          className={`card block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-900 hover:shadow-md`}
        >
          <Skeleton variant="rectangular" width={256} height={384} className="object-cover w-full h-full" />
          <div className="px-3">
            <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
              <Skeleton width={100} height={20} />
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              <Skeleton width={80} height={20} />
            </p>
            <div>
              <div className="text-justify text-xs">
                <Skeleton width={200} height={10} />
                <Skeleton width={200} height={10} />
                <Skeleton width={200} height={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCardSkeleton;
