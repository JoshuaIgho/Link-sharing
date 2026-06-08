import React from 'react';

const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="card space-y-4">
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);

export const LinkSkeleton = () => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100">
    <Skeleton className="w-12 h-12 rounded-lg" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
    <Skeleton className="w-10 h-6 rounded-full" />
  </div>
);

export const StatsSkeleton = () => (
  <div className="grid md:grid-cols-3 gap-6 mb-8">
    {[1, 2, 3].map(i => (
      <div key={i} className="card space-y-3">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-8 w-1/3" />
      </div>
    ))}
  </div>
);

export default Skeleton;
