import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { getOptimizedImageUrl } from '../utils/image';

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, removeItem, items } = useCartStore();
  const cartItem = items.find((item) => item.product._id === product._id);
  const countInCart = cartItem ? cartItem.quantity : 0;
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  const displayImage = getOptimizedImageUrl(product);

  const handleDecrease = () => {
    if (countInCart === 1) {
      removeItem(product._id);
    } else {
      updateQuantity(product._id, countInCart - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(product._id, countInCart + 1);
  };

  return (
    <article className="group rounded-md bg-white p-2">
      <div className="relative overflow-hidden rounded-sm bg-zinc-100">
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 text-center text-sm font-medium text-zinc-800">{product.name}</h3>
      <p className="mt-1 line-clamp-1 text-center text-xs text-zinc-500">{product.description}</p>
      <div className="mt-2 flex items-center justify-center gap-2 text-sm">
        <span className="font-semibold text-zinc-900">Rs {product.price}</span>
      </div>
      <div className="mt-3 flex gap-2">
        <Link to={`/products/${product._id}`} className="flex-1 flex items-center justify-center rounded border border-zinc-300 px-3 py-2 text-center text-xs">
          View Details
        </Link>
        {countInCart > 0 ? (
          <div className="flex flex-1 items-center justify-between rounded bg-accent px-2 py-1 text-xs font-medium text-white">
            <button onClick={handleDecrease} className="rounded px-2 py-1 text-base leading-none hover:bg-white/20">-</button>
            <span className="min-w-4 text-center">{countInCart}</span>
            <button onClick={handleIncrease} className="rounded px-2 py-1 text-base leading-none hover:bg-white/20">+</button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product, 1)}
            className="flex-1 rounded bg-accent px-3 py-2 text-xs font-medium text-white"
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
