const features = [
  {
    title: 'Fast Delivery',
    description: 'Reliable shipping.',
    icon: '🚚'
  },
  {
    title: 'Secure Pay',
    description: '100% protected.',
    icon: '🔒'
  },
  {
    title: 'Quality',
    description: 'Best curation.',
    icon: '⭐'
  },
  {
    title: 'Support',
    description: 'Always here.',
    icon: '💬'
  }
];

const TrustSection = () => {
  return (
    <section className="section-app bg-neutral-50 border-y border-neutral-100">
      <div className="container-app">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm transition-transform active:scale-95">
              <div className="mb-2 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xs font-black text-neutral-900 mb-1">{feature.title}</h3>
              <p className="text-[10px] text-neutral-400 font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
