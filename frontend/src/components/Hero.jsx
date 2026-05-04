import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50"></div>
      
      <div className="container-base grid gap-12 lg:grid-cols-2 lg:items-center py-12">
        <div className="animate-fade-in flex flex-col justify-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase mb-6 self-start">
            Premium Collection
          </span>
          <h1 className="text-[32px] md:text-[40px] font-black text-neutral-900 leading-tight">
            Curated Picks for Your <br />
            <span className="text-gradient">Modern Lifestyle</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-neutral-500 max-w-md">
            Discover trendy stationaries, premium gift bundles, and fancy accessories. Quality you can trust, delivered with style and care.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary min-w-[160px]">
              Shop Now
            </Link>
            <Link to="/products" className="btn-secondary min-w-[160px]">
              Explore
            </Link>
          </div>
        </div>
        
        <div className="relative hidden lg:block animate-fade-in [animation-delay:200ms]">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] max-h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1000&q=80"
              alt="Hero Image"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
