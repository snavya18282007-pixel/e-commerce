import { useEffect, useState } from 'react';
import { getHomeData } from '../services/api';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
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
    <div className="pb-10">
      <Hero />
      
      <div className="container-base mt-16 space-y-24">
        {/* New Arrivals Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">New Arrivals</h2>
              <p className="mt-2 text-zinc-500">Freshly added items to our collection.</p>
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-xs font-medium text-accent">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Updating Live...
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>

        {/* Featured Banner (Optional, added for premium feel) */}
        <section className="relative overflow-hidden rounded-3xl bg-zinc-900 px-8 py-16 text-white md:px-16 md:py-24">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-accent/20 to-transparent"></div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl font-bold md:text-5xl">Special Hampers for Special Moments</h2>
            <p className="mt-6 text-lg text-zinc-400">
              Personalized gift boxes starting from Rs 499. Perfect for birthdays, anniversaries, and more.
            </p>
            <button className="mt-10 rounded-full bg-white px-8 py-3 text-sm font-bold text-zinc-900 transition-all hover:bg-zinc-100 active:scale-95">
              Explore Hampers
            </button>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80" 
            alt="Hampers" 
            className="absolute -right-20 top-1/2 hidden -translate-y-1/2 rounded-full border-8 border-white/10 opacity-50 lg:block lg:h-96 lg:w-96"
          />
        </section>

        {/* Best Sellers Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Best Sellers</h2>
              <p className="mt-2 text-zinc-500">The most loved items by our community.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>

        <TrustSection />
      </div>
    </div>
  );
};

export default HomePage;
