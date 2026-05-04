import { useEffect, useState } from 'react';
import { getHomeData } from '../services/api';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import { demoProducts } from '../data/demoProducts';
import { ProductSkeleton } from '../components/SkeletonLoader';

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
        console.error('Failed to fetch home data:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="bg-neutral-50">
      <Hero />
      
      {/* Featured Products - White background */}
      <section className="section-padding bg-white">
        <div className="container-base">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-black text-neutral-900">Featured Collections</h2>
              <p className="mt-3 text-neutral-500 max-w-lg">Hand-picked arrivals chosen for their exceptional quality and timeless design.</p>
            </div>
            <button className="text-sm font-bold text-primary hover:underline underline-offset-4">View All Products &rarr;</button>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Neutral-50 background (handled in component) */}
      <TrustSection />

      {/* Social Proof Section - Brand color background */}
      <section className="py-16 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 h-full w-1/3 bg-white/5 skew-x-12 translate-x-1/2"></div>
        <div className="container-base flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Loved by Shoppers Worldwide</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
              <div className="flex flex-col">
                <span className="text-4xl font-black">4.8/5</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">Average Rating</span>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-black">500+</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">Daily Deliveries</span>
              </div>
              <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-black">120+</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">Verified Reviews</span>
              </div>
            </div>
          </div>
          <div className="flex -space-x-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/100?img=${i + 10}`}
                alt="User"
                className="h-14 w-14 rounded-full border-4 border-primary bg-neutral-200"
              />
            ))}
            <div className="h-14 w-14 rounded-full border-4 border-primary bg-white flex items-center justify-center text-primary font-black text-xs">
              +1k
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers - White background */}
      <section className="section-padding bg-white">
        <div className="container-base">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-neutral-900">Trending Now</h2>
            <p className="mt-3 text-neutral-500 max-w-lg">Our community's favorite picks this season.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action - Final stretch */}
      <section className="section-padding bg-neutral-50">
        <div className="container-base rounded-3xl bg-neutral-900 px-8 py-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50"></div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">Ready to start your collection?</h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-10 relative z-10 text-lg">Join thousands of happy customers and elevate your lifestyle with Keerthi's curated picks.</p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button className="btn-primary px-10">Create Account</button>
            <button className="btn-secondary px-10 bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">Explore Catalog</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
