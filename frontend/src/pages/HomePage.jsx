import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const demoNewArrivals = [
  {
    _id: 'demo-new-1',
    name: 'Floral Gift Hamper',
    price: 799,
    description: 'Curated hamper with greeting card and mini decor.',
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80']
  },
  {
    _id: 'demo-new-2',
    name: 'Pastel Journal Set',
    price: 349,
    description: 'Premium notebook set for daily planning and notes.',
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80']
  },
  {
    _id: 'demo-new-3',
    name: 'Fancy Candle Box',
    price: 499,
    description: 'Elegant scented candle gift box for celebrations.',
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80']
  },
  {
    _id: 'demo-new-4',
    name: 'Sparkle Pen Bundle',
    price: 229,
    description: 'Stylish metallic pens for gifts and stationery lovers.',
    rating: 4.5,
    images: ['https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80']
  }
];

const demoBestSellers = [
  {
    _id: 'demo-best-1',
    name: 'Return Gift Combo Pack',
    price: 999,
    description: 'Popular combo pack perfect for party return gifts.',
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=80']
  },
  {
    _id: 'demo-best-2',
    name: 'Luxury Writing Kit',
    price: 649,
    description: 'Premium pen and card set for premium gifting.',
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=900&q=80']
  },
  {
    _id: 'demo-best-3',
    name: 'Decorative Photo Frame',
    price: 399,
    description: 'Classic photo frame for memorable gift moments.',
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80']
  },
  {
    _id: 'demo-best-4',
    name: 'Festive Wrapping Box',
    price: 279,
    description: 'Colorful wrapping essentials with tags and ribbons.',
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&w=900&q=80']
  }
];

const HomePage = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [newData, bestData] = await Promise.all([
          getProducts({ page: 1, limit: 4, sort: '-createdAt' }),
          getProducts({ page: 1, limit: 4, sort: '-rating' })
        ]);
        setNewArrivals(newData.products || []);
        setBestSellers(bestData.products || []);
      } catch (err) {
        setNewArrivals([]);
        setBestSellers([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const displayNewArrivals = newArrivals.length ? newArrivals : demoNewArrivals;
  const displayBestSellers = bestSellers.length ? bestSellers : demoBestSellers;

  return (
    <div className="space-y-10">
      <section className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-violet-700">Gift and Fancy Collection</p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900 md:text-4xl">Thoughtful picks for every celebration.</h1>
          <p className="mt-3 max-w-xl text-sm text-zinc-600">
            Discover trendy stationaries, premium gift bundles, and fancy accessories curated for birthdays, weddings, and festive moments.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=900&q=80"
          alt="Gift items display"
          className="h-52 w-full rounded-md object-cover md:h-full"
        />
      </section>

      {loading ? <LoadingSpinner /> : (
        <>
          <section>
            <h2 className="mb-4 text-xl font-semibold">New Arrivals</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {displayNewArrivals.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Best Sellers</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {displayBestSellers.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
