import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { getOptimizedImageUrl } from '../utils/image';

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, removeItem, items } = useCartStore();
  const cartItem = items.find((item) => item.product._id === product._id);
  const countInCart = cartItem ? cartItem.quantity : 0;
  
  const displayImage = getOptimizedImageUrl(product);
  
  const hasDiscount = product.price > 500;
  const discountPercent = 20;
  const oldPrice = hasDiscount ? Math.round(product.price * (1 + discountPercent / 100)) : null;

  const handleDecrease = () => {
    if (countInCart === 1) removeItem(product._id);
    else updateQuantity(product._id, countInCart - 1);
  };

  const handleIncrease = () => updateQuantity(product._id, countInCart + 1);

  return (
    <article className="card-premium group p-4 flex flex-col">
      <div className="relative h-[180px] w-full overflow-hidden rounded-xl bg-neutral-50 mb-4 flex-shrink-0">
        {hasDiscount && (
          <span className="absolute left-3 top-3 z-10 rounded-lg bg-danger px-2 py-1 text-[10px] font-black text-white uppercase shadow-lg">
            {discountPercent}% OFF
          </span>
        )}
        
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">{product.category || 'Collection'}</p>
            <span className="text-[11px] font-bold text-neutral-900">⭐ {product.rating || 4.5}</span>
          </div>
          
          <h3 className="text-sm font-bold text-neutral-800 line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
        </div>
        
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-base font-black text-neutral-900">Rs {product.price}</span>
            {oldPrice && (
              <span className="text-xs text-neutral-400 line-through">Rs {oldPrice}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {countInCart > 0 ? (
              <div className="flex flex-1 items-center justify-between rounded-xl bg-neutral-900 p-1 text-white">
                <button onClick={handleDecrease} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10">-</button>
                <span className="text-xs font-bold">{countInCart}</span>
                <button onClick={handleIncrease} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10">+</button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product, 1)}
                className="flex-1 btn-primary py-2 text-xs"
              >
                Add to Cart
              </button>
            )}
            
            <Link to={`/products/${product._id}`} className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 hover:border-neutral-300 hover:bg-neutral-50 transition-all flex-shrink-0">
               <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
