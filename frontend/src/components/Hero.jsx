import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-bgPremium pt-12 pb-20 md:pt-24 md:pb-32">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 h-64 w-64 bg-brand/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container-premium relative z-10 text-center animate-fade-up">
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          Premium Gifting Experience
        </span>
        
        <h1 className="text-4xl md:text-7xl font-black text-textPrimary leading-[1.1] mb-8">
          The Art of <br />
          <span className="italic text-brandAccent">Giving.</span>
        </h1>
        
        <p className="max-w-xl mx-auto text-textSecondary text-base md:text-lg mb-12 leading-relaxed">
          Discover our curated collection of rustic stationaries, premium gift bundles, and fancy accessories designed for the modern lifestyle.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/products" className="btn-primary w-full sm:w-auto min-w-[200px]">
            Shop Collection
          </Link>
          <Link to="/products" className="btn-secondary w-full sm:w-auto min-w-[200px]">
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
