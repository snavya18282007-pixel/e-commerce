import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const discountedPrice = (product.price * 0.82).toFixed(2);

  return (
    <article className="group rounded-md bg-white p-2">
      <div className="relative overflow-hidden rounded-sm bg-zinc-100">
        <span className="absolute left-2 top-2 z-10 rounded bg-rose-700 px-2 py-0.5 text-xs font-medium text-white">
          Sale!
        </span>
        <img
          src={product.images?.[0] || 'https://placehold.co/600x750?text=Gift+Item'}
          alt={product.name}
          className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-4 text-center text-sm font-medium text-zinc-800">{product.name}</h3>
      <p className="mt-1 line-clamp-1 text-center text-xs text-zinc-500">{product.description}</p>
      <div className="mt-2 flex items-center justify-center gap-2 text-sm">
        <span className="text-zinc-400 line-through">Rs {product.price}</span>
        <span className="font-semibold text-zinc-900">Rs {discountedPrice}</span>
      </div>
      <div className="mt-3 flex gap-2">
        <Link to={`/products/${product._id}`} className="flex-1 rounded border border-zinc-300 px-3 py-2 text-center text-xs">
          View Details
        </Link>
        <button
          onClick={() => addToCart(product, 1)}
          className="flex-1 rounded bg-accent px-3 py-2 text-xs font-medium text-white"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
