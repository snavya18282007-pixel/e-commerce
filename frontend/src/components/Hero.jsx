import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-50 via-white to-white"></div>
      
      <div className="container-base grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-accent uppercase">
            New Collection 2026
          </span>
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-zinc-900 md:text-7xl">
            Keerthi's <span className="text-gradient">Store</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
            Elevate your gifting experience with our curated collection of trendy stationaries, premium gift bundles, and fancy accessories. Quality you can trust, designs you'll love.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary">
              Shop Now
            </Link>
            <Link to="/products?category=Gift%20Items" className="rounded-full border border-zinc-200 bg-white px-8 py-3 text-sm font-semibold text-zinc-700 transition-all hover:bg-zinc-50 hover:border-zinc-300">
              Browse Gifts
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-8 border-t border-zinc-100 pt-8">
            <div>
              <p className="text-2xl font-bold text-zinc-900">5k+</p>
              <p className="text-sm text-zinc-500">Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">10k+</p>
              <p className="text-sm text-zinc-500">Happy Clients</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-900">4.9/5</p>
              <p className="text-sm text-zinc-500">Avg Rating</p>
            </div>
          </div>
        </div>
        
        <div className="relative hidden lg:block">
          <div className="absolute -left-4 -top-4 h-64 w-64 rounded-full bg-accent/5 blur-3xl"></div>
          <div className="absolute -bottom-4 -right-4 h-64 w-64 rounded-full bg-accentSoft/5 blur-3xl"></div>
          <img
            src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1000&q=80"
            alt="Hero collection"
            className="relative rounded-3xl object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
