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
    <div className="bg-bgPremium">
      <Hero />
      
      {/* Featured Collections - Minimal Separation */}
      <section className="section-premium">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-textPrimary">Handpicked.</h2>
              <p className="text-textSecondary text-sm font-medium">New arrivals selected for quality.</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-brandAccent border-b-2 border-brandAccent/20 pb-1 hover:border-brandAccent transition-all">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Rustic Layered Look */}
      <TrustSection />

      {/* Social Proof - Premium Minimalist */}
      <section className="py-20 bg-brand text-white relative overflow-hidden">
        <div className="container-premium flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="text-center md:text-left max-w-xl">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Crafted with <br />
              <span className="text-brandAccent">Purpose.</span>
            </h2>
            <p className="text-white/70 text-base font-medium leading-relaxed">
              Join 1,200+ individuals who have elevated their lifestyle with our curated rustic essentials.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 20}`}
                  alt="Reviewer"
                  className="h-14 w-14 rounded-full border-4 border-brand shadow-xl"
                />
              ))}
            </div>
            <div className="text-center md:text-right">
              <p className="text-2xl font-black">4.9/5</p>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Verified Community Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="section-premium">
        <div className="container-premium">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-textPrimary">The Essentials.</h2>
            <p className="text-textSecondary text-sm font-medium">Most loved items by our patrons.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Brand Ethos CTA */}
      <section className="section-premium bg-surface">
        <div className="container-premium">
          <div className="bg-bgPremium rounded-premium p-10 md:p-20 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black text-textPrimary mb-6">Experience the Quality.</h2>
            <p className="text-textSecondary max-w-lg mb-10">
              Start your journey with Keerthi's today and discover why quality matters in every small detail.
            </p>
            <div className="flex gap-4 w-full justify-center">
               <button className="btn-primary px-12 shadow-xl">Get Started</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
