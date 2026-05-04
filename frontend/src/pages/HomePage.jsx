import { useEffect, useState } from 'react';
import { getHomeData } from '../services/api';
import ProductCard from '../components/ProductCard';
import { demoProducts } from '../data/demoProducts';
import { SectionSkeleton } from '../components/SkeletonLoader';

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState(demoProducts.slice(0, 4));
  const [bestSellers, setBestSellers] = useState(demoProducts.slice(2, 6));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHomeData();
        if (data.newArrivals?.length) setNewArrivals(data.newArrivals);
        if (data.bestSellers?.length) setBestSellers(data.bestSellers);
      } catch (err) {
        console.error('Failed to fetch home data, using demo products:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Section - Above the fold, render instantly */}
      <section className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-violet-700">Gift and Fancy Collection</p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900 md:text-4xl">Thoughtful picks for every celebration.</h1>
          <p className="mt-3 max-w-xl text-sm text-zinc-600">
            Discover trendy stationaries, premium gift bundles, and fancy accessories curated for birthdays, weddings, and festive moments.
          </p>
        </div>
        <div className="relative h-52 w-full overflow-hidden rounded-md md:h-full bg-zinc-100">
           <img
            src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80&f_auto&q_auto"
            alt="Gift items display"
            loading="eager"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Sections render with demo data immediately, then update */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Arrivals</h2>
          {loading && <span className="text-xs text-zinc-400 animate-pulse">Updating...</span>}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Best Sellers</h2>
          {loading && <span className="text-xs text-zinc-400 animate-pulse">Updating...</span>}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Example of where Skeletons could be used if we had more sections */}
      {loading && !newArrivals.length && (
        <SectionSkeleton title="Loading More..." />
      )}
    </div>
  );
};

export default HomePage;
