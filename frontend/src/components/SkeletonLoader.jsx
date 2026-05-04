import React from 'react';

export const ProductSkeleton = () => (
  <div className="animate-pulse rounded-md bg-white p-2">
    <div className="h-72 w-full rounded-sm bg-zinc-200"></div>
    <div className="mt-4 h-4 w-3/4 rounded bg-zinc-200 mx-auto"></div>
    <div className="mt-2 h-3 w-1/2 rounded bg-zinc-200 mx-auto"></div>
    <div className="mt-2 h-4 w-1/4 rounded bg-zinc-200 mx-auto"></div>
    <div className="mt-3 flex gap-2">
      <div className="h-8 flex-1 rounded bg-zinc-200"></div>
      <div className="h-8 flex-1 rounded bg-zinc-200"></div>
    </div>
  </div>
);

export const SectionSkeleton = ({ title }) => (
  <section className="animate-pulse">
    <div className="mb-4 h-6 w-32 rounded bg-zinc-200"></div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  </section>
);
