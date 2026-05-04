import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { getOptimizedImageUrl } from '../utils/image';

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, removeItem, items } = useCartStore();
  const cartItem = items.find((item) => item.product._id === product._id);
  const countInCart = cartItem ? cartItem.quantity : 0;
  
  const displayImage = getOptimizedImageUrl(product);
  
  // Fake rating and discount for premium look
  const rating = product.rating || 4.5;
  const hasDiscount = product.price > 500;
  const discountPercent = 20;
  const oldPrice = hasDiscount ? Math.round(product.price * (1 + discountPercent / 100)) : null;

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
    <article className="card-premium group relative flex flex-col p-3">
      {hasDiscount && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
          {discountPercent}% OFF
        </span>
      )}
      
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-50">
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      
      <div className="flex flex-1 flex-col pt-4 px-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-accent/80">{product.category || 'Gift Item'}</p>
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-bold text-zinc-900">{rating}</span>
            <svg className="h-2.5 w-2.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        
        <h3 className="mt-1 text-sm font-semibold text-zinc-800 line-clamp-1 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-zinc-900">Rs {product.price}</span>
          {oldPrice && (
            <span className="text-xs text-zinc-400 line-through">Rs {oldPrice}</span>
          )}
        </div>
        
        <div className="mt-2 flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[10px] font-medium text-zinc-500">In Stock</span>
        </div>
        
        <div className="mt-5 flex gap-2">
          <Link to={`/products/${product._id}`} className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all hover:border-zinc-300 hover:bg-zinc-50">
            <span className="sr-only">View Details</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
          
          {countInCart > 0 ? (
            <div className="flex flex-1 items-center justify-between rounded-full bg-zinc-900 px-1 text-white">
              <button onClick={handleDecrease} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 transition-colors">-</button>
              <span className="text-xs font-bold w-6 text-center">{countInCart}</span>
              <button onClick={handleIncrease} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/10 transition-colors">+</button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              className="flex-1 rounded-full bg-zinc-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-zinc-800 active:scale-95"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
