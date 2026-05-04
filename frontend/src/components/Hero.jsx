import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white border-b border-neutral-100">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50"></div>
      
      <div className="container-base section-padding grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="animate-fade-in max-w-2xl">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-bold tracking-wider text-primary uppercase mb-6">
            Trusted by 500+ users
          </span>
          <h1 className="text-5xl font-black text-neutral-900 md:text-6xl leading-[1.1]">
            Elevate Your <br />
            <span className="text-gradient">Everyday Life</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-500 max-w-lg">
            Discover a curated collection of trendy stationaries, premium gift bundles, and fancy accessories. Quality you can trust, delivered with care.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary px-10">
              Shop Now
            </Link>
            <Link to="/products" className="btn-secondary px-10">
              Explore
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-neutral-900">⭐ 4.8/5</span>
              <span className="text-sm text-neutral-400">from 120+ reviews</span>
            </div>
          </div>
        </div>
        
        <div className="relative lg:block animate-fade-in [animation-delay:200ms]">
          <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-secondary/5 blur-3xl"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1000&q=80"
              alt="Premium Gift Collection"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
