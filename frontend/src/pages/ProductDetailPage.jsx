import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCartStore } from '../store/cartStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import { getOptimizedImageUrl } from '../utils/image';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart, items } = useCartStore();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.product);
      } catch (err) {
        setError(err.message || 'Failed to fetch product.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;
  if (!product) return <ErrorState message="Product not found." />;

  const cartItem = items.find((item) => item.product._id === product._id);
  const countInCart = cartItem ? cartItem.quantity : 0;

  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const mainImage = getOptimizedImageUrl(product, { width: 800 });
  const allImages = product.images?.map(img => {
      if (typeof img === 'string' && img.startsWith('http')) return img;
      return getOptimizedImageUrl({ ...product, imagePath: img });
  }) || [mainImage];

  return (
    <div className="container-base section-padding grid gap-10 lg:grid-cols-2 lg:items-start">
      <section>
        <img
          src={mainImage}
          alt={product.name}
          className="aspect-square w-full rounded-2xl object-cover shadow-lg"
        />
        {allImages.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {allImages.map((img, index) => (
              <button key={img + index} onClick={() => setImageIndex(index)} className="overflow-hidden rounded border border-zinc-200">
                <img src={img} alt={`${product.name}-${index}`} loading="lazy" className="h-16 w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm">
        <h1 className="text-[28px] md:text-[32px] font-black text-neutral-900 leading-tight">{product.name}</h1>
        <p className="mt-2 text-xl font-bold">Rs {product.price}</p>
        <p className="mt-1 text-sm text-zinc-600">★ {product.rating}</p>
        <p className="mt-3 text-sm text-zinc-600">{product.description}</p>
        <p className="mt-3 text-sm text-zinc-700">{product.fullDescription || product.description}</p>

        <p className="mt-5 text-sm text-zinc-700">
          Hurry! only {product.stock || 1} left in stock.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-2 text-xl text-zinc-500"
            >
              -
            </button>
            <span className="min-w-10 text-center text-sm">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-2 text-xl text-zinc-500"
            >
              +
            </button>
          </div>
          <button
            onClick={() => addToCart(product, quantity)}
            className="btn-primary flex-1 py-4"
          >
            {countInCart > 0 ? `In Cart (${countInCart})` : 'Add to Cart'}
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => {
              addToCart(product, quantity);
              navigate('/checkout');
            }}
            className="btn-secondary w-full py-4 border-neutral-200"
          >
            Buy Now
          </button>
        </div>

        <div className="mt-6 space-y-1 border-t border-zinc-200 pt-4 text-sm text-zinc-700">
          <p>EAN: QT50000</p>
          <p>SKU: N/A</p>
          <p>Category: {(product.category || 'Gift Items').toUpperCase()}</p>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
