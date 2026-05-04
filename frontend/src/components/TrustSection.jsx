const features = [
  {
    title: 'Fast Delivery',
    description: 'Reliable shipping for all orders.',
    icon: '🚚'
  },
  {
    title: 'Secure Checkout',
    description: '100% protected payments.',
    icon: '🔒'
  },
  {
    title: 'Quality Products',
    description: 'Only the best for you.',
    icon: '⭐'
  },
  {
    title: '24/7 Support',
    description: 'Always here to help.',
    icon: '💬'
  }
];

const TrustSection = () => {
  return (
    <section className="section-padding bg-neutral-50 border-y border-neutral-100">
      <div className="container-base">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-neutral-100 shadow-sm transition-smooth hover:shadow-md">
              <div className="mb-4 text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-neutral-900">{feature.title}</h3>
              <p className="mt-2 text-xs text-neutral-400 font-medium">
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
