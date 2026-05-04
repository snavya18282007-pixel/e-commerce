const AboutPage = () => {
  return (
    <div className="container-premium section-premium animate-fade-up">
      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          Our Heritage
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-textPrimary leading-tight mb-8">
          The Story Behind <br />
          <span className="italic text-brandAccent">Keerthi's.</span>
        </h1>
        <div className="prose prose-lg text-textSecondary leading-relaxed space-y-6">
          <p>
            Born from a passion for handcrafted beauty and rustic charm, Keerthi's is more than just a store—it's a curated experience of quality and elegance.
          </p>
          <p>
            We believe that every gift should tell a story. That's why we source the finest stationery, jewelry, and decor pieces that resonate with modern aesthetics while preserving traditional craftsmanship.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
