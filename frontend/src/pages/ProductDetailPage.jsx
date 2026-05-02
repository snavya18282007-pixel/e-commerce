import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCartStore } from '../store/cartStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';

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

  const getImageUrl = (product) => {
    if (!product.imagePath) return product.images?.[0] || 'https://placehold.co/700x500?text=Product';
    if (product.imagePath.startsWith('http')) return product.imagePath;
    if (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
      return `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${product.imagePath}`;
    }
    return `${baseUrl}/public/uploads/${product.imagePath}`;
  };

  const mainImage = product.imagePath 
    ? getImageUrl(product) 
    : (product.images?.[imageIndex] || 'https://placehold.co/700x500?text=Product');
  const allImages = product.imagePath 
    ? [getImageUrl(product), ...(product.images || [])] 
    : (product.images || []);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section>
        <img
          src={mainImage}
          alt={product.name}
          className="h-80 w-full rounded-lg object-cover"
        />
        {allImages.length > 1 && (
          <div className="mt-3 grid grid-cols-4 gap-2">
            {allImages.map((img, index) => (
              <button key={img + index} onClick={() => setImageIndex(index)} className="overflow-hidden rounded border border-zinc-200">
                <img src={img} alt={`${product.name}-${index}`} className="h-16 w-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-5">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
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
            className="rounded-full bg-rose-600 px-12 py-3 text-sm font-bold uppercase tracking-wide text-white"
          >
            {countInCart > 0 ? `Add to Cart (${countInCart})` : 'Add to Cart'}
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => {
              addToCart(product, quantity);
              navigate('/checkout');
            }}
            className="rounded-full bg-rose-600 px-12 py-3 text-sm font-bold uppercase tracking-wide text-white"
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
