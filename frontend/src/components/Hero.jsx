import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import heroImg from '../assets/hero-jewelry.jpg.jpeg';
import heroImg1 from '../assets/hero1.png';

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      image: heroImg,
      tagline: "Handcrafted Excellence",
      title: "Rustic Elegance.",
      description: "Experience the fusion of raw nature and refined luxury. Our curated collections are designed to tell your unique story.",
      align: "right"
    },
    {
      image: heroImg1,
      tagline: "New Collection 2026",
      title: "Modern Minimal.",
      description: "Discover our latest arrivals of high-end gift sets and premium stationery designed for those who appreciate the finer things.",
      align: "left"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center bg-bgPremium">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === activeSlide ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-110 invisible'}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className={`h-full w-full object-cover ${slide.align === 'right' ? 'object-left' : 'object-center'}`}
            />
            {/* Mobile Overlay */}
            <div className="absolute inset-0 bg-bgPremium/40 md:hidden"></div>
            {/* Desktop Gradient Overlay */}
            <div className={`hidden md:block absolute inset-0 bg-gradient-to-r ${slide.align === 'right' ? 'from-bgPremium/40 via-bgPremium/10 to-bgPremium/90' : 'from-bgPremium/90 via-bgPremium/10 to-bgPremium/40'}`}></div>
          </div>
          
          <div className="container-premium relative z-10 h-full flex items-center">
            <div className={`max-w-xl px-4 animate-fade-up ${slide.align === 'right' ? 'ml-auto text-center md:text-right' : 'mr-auto text-center md:text-left'}`}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                {slide.tagline}
              </span>
              
              <h1 className="text-4xl md:text-7xl font-black text-textPrimary leading-[1.1] mb-8">
                {slide.title.split(' ')[0]} <br />
                <span className="italic text-brandAccent">{slide.title.split(' ')[1]}</span>
              </h1>
              
              <p className="text-textSecondary text-base md:text-lg mb-12 leading-relaxed font-medium">
                {slide.description}
              </p>
              
              <div className={`flex flex-col sm:flex-row items-center gap-4 ${slide.align === 'right' ? 'justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
                <Link to="/products" className="btn-primary w-full sm:w-auto min-w-[200px] py-4">
                  Shop Collection
                </Link>
                <Link to="/products" className="btn-secondary w-full sm:w-auto min-w-[200px] py-4 backdrop-blur-md bg-white/40">
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setActiveSlide(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${i === activeSlide ? 'w-8 bg-brand' : 'w-2 bg-brand/30'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
