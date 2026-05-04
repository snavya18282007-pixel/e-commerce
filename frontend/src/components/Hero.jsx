import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroImg from '../assets/hero-jewelry.jpg.jpeg';
import heroImg1 from '../assets/hero1.png';

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      image: heroImg,
      title: "Premium Jhumkas Collection",
      tagline: "Elegant • Handmade • Affordable",
    },
    {
      image: heroImg1,
      title: "Handcrafted Gift Sets",
      tagline: "Unique • Premium • Personal",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[75vh] md:h-[65vh] w-full overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* 1. Dark Overlay (MANDATORY) */}
          <div className="absolute inset-0 z-0">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="h-full w-full object-cover object-right md:object-right scale-105"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* 2. Hero Layout (Proper Structure) */}
          <div className="absolute bottom-16 left-4 right-4 z-10 md:left-12 md:max-w-md animate-fade-up">
            
            {/* 4. Blur Glass Effect */}
            <div className="backdrop-blur-md bg-black/30 p-6 rounded-[16px] border border-white/10 shadow-2xl">
              <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-1">
                {slide.title}
              </h1>

              <p className="text-sm md:text-base text-white opacity-90 mb-6 font-medium">
                {slide.tagline}
              </p>

              <Link to="/products" className="block text-center w-full bg-[#7E102C] hover:bg-[#C94F4F] text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Subtle Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setActiveSlide(i)}
            className={`h-1 transition-all duration-500 rounded-full ${i === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
