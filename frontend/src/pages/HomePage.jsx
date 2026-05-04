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
      
      {/* Featured Collections */}
      <section className="section-padding bg-white">
        <div className="container-base">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-[24px] md:text-[32px] font-black text-neutral-900">Featured Collections</h2>
              <p className="mt-3 text-neutral-500 max-w-lg">Hand-picked arrivals chosen for their exceptional quality and timeless design.</p>
            </div>
          </div>
          
          <div className="grid-products">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-primary text-white overflow-hidden relative">
        <div className="container-base flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black mb-4">Loved by 500+ Customers</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8">
              <div className="flex flex-col">
                <span className="text-4xl font-black">4.8/5</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">Avg Rating</span>
              </div>
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
                src={`https://i.pravatar.cc/100?img=${i + 15}`}
                alt="User"
                className="h-14 w-14 rounded-full border-4 border-primary bg-neutral-200"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="section-padding bg-white">
        <div className="container-base">
          <div className="mb-12">
            <h2 className="text-[24px] md:text-[32px] font-black text-neutral-900">Trending Now</h2>
            <p className="mt-3 text-neutral-500 max-w-lg">Our community's favorite picks this season.</p>
          </div>
          <div className="grid-products">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <TrustSection />

      {/* Final CTA */}
      <section className="section-padding bg-neutral-50">
        <div className="container-base rounded-3xl bg-neutral-900 px-8 py-16 text-center relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to Elevate Your Style?</h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-base">Join thousands of happy customers and discover Keerthi's curated picks today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary px-10">Get Started</button>
            <button className="btn-secondary px-10 bg-neutral-800 border-neutral-700 text-white">Browse Shop</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
