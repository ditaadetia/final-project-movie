import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function MovieDetailSkeleton() {
  return (
    // <div className="container">
    <>
        <div className="cover" width={300}>
            <Skeleton width={200} height={30} className="title1" />
            <Skeleton width={150} height={20} className="title2" />
            <Skeleton width={100} height={20} className="likes" />
        </div>
        <Skeleton variant="rectangular" height={450} className="hero" style={{ width:'100%' }}/>
        <div className="description">
            <div className="column1">
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
            </div>
            <div className="column2">
            <Skeleton width={400} height={20} />
            <Skeleton width={400} height={20} />
            <Skeleton width={400} height={20} />
            <Skeleton width={400} height={20} />
            <Skeleton width={400} height={20} />
            </div>
        </div>
    </>
    // </div>
  );
}
