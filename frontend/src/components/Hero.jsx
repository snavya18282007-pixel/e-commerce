import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-app-gradient relative overflow-hidden py-12 md:py-20 border-b border-neutral-100">
      <div className="container-app">
        <div className="max-w-xl">
          <h1 className="text-3xl font-black text-neutral-900 md:text-5xl leading-tight">
            Curated Picks for <br />
            <span className="text-gradient">Modern Living</span>
          </h1>
          <p className="mt-4 text-base text-neutral-500 leading-relaxed">
            Elevate your everyday with premium stationery, unique gifts, and trendy accessories. Quality you can trust.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/products" className="btn-primary-app">
              Shop Now
            </Link>
            <Link to="/products" className="btn-secondary-app">
              Explore Collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
