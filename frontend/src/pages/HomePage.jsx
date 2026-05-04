import { useEffect, useState } from 'react';
import { getHomeData } from '../services/api';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import { demoProducts } from '../data/demoProducts';

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
      
      {/* Featured Products */}
      <section className="section-app bg-white">
        <div className="container-app">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-neutral-900 tracking-tight">Featured</h2>
            <button className="text-xs font-bold text-primary uppercase tracking-widest">See All</button>
          </div>
          
          <div className="grid-app">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Trending Now */}
      <section className="section-app bg-white">
        <div className="container-app">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-neutral-900 tracking-tight">Trending</h2>
            <button className="text-xs font-bold text-primary uppercase tracking-widest">Explore</button>
          </div>
          <div className="grid-app">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* App CTA */}
      <section className="section-app">
        <div className="container-app">
          <div className="bg-neutral-900 rounded-3xl p-8 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-3">Shop the App Way</h2>
              <p className="text-neutral-400 text-sm mb-6">Join 500+ happy customers shopping with Keerthi's today.</p>
              <button className="w-full bg-white text-neutral-900 rounded-xl py-4 text-sm font-black active:scale-95 transition-transform">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
