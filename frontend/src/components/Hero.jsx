import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';

const Hero = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center">
      {/* Background Image with Enhanced Mobile Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Premium Gifting" 
          className="h-full w-full object-cover object-center scale-105 animate-pulse-slow"
        />
        {/* Stronger overlay on mobile to ensure text readability */}
        <div className="absolute inset-0 bg-bgPremium/40 md:hidden"></div>
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-bgPremium/40 via-bgPremium/20 to-bgPremium/80"></div>
      </div>
      
      <div className="container-premium relative z-10">
        <div className="max-w-xl mx-auto md:ml-auto text-center md:text-right animate-fade-up px-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Handcrafted Excellence
          </span>
          
          <h1 className="text-4xl md:text-7xl font-black text-textPrimary leading-[1.1] mb-8">
            Rustic <br />
            <span className="italic text-brandAccent">Elegance.</span>
          </h1>
          
          <p className="text-textSecondary text-base md:text-lg mb-12 leading-relaxed font-medium">
            Experience the fusion of raw nature and refined luxury. Our curated collections are designed to tell your unique story.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4">
            <Link to="/products" className="btn-primary w-full sm:w-auto min-w-[200px] py-4">
              Shop Collection
            </Link>
            <Link to="/about" className="btn-secondary w-full sm:w-auto min-w-[200px] py-4 backdrop-blur-md bg-white/40">
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
