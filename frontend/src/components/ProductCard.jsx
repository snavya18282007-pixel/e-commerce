import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { getOptimizedImageUrl } from '../utils/image';

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, removeItem, items } = useCartStore();
  const cartItem = items.find((item) => item.product._id === product._id);
  const countInCart = cartItem ? cartItem.quantity : 0;
  
  const displayImage = getOptimizedImageUrl(product, { width: 400 });
  const hasDiscount = product.price > 500;
  const oldPrice = hasDiscount ? Math.round(product.price * 1.25) : null;

  const handleDecrease = () => {
    if (countInCart === 1) removeItem(product._id);
    else updateQuantity(product._id, countInCart - 1);
  };

  const handleIncrease = () => updateQuantity(product._id, countInCart + 1);

  return (
    <article className="bg-white rounded-[16px] p-2 md:p-3 border border-borderSubtle shadow-soft flex flex-col h-full group transition-all duration-300 hover:shadow-premium active:scale-[0.98]">
      {/* Product Image - Square Ratio */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[12px] md:rounded-[16px] bg-bgPremium mb-2.5">
        <span className="absolute left-2 top-2 z-10 rounded-full bg-white px-2 py-0.5 text-[9px] font-black text-brandAccent shadow-sm">
          SALE
        </span>
        
        <Link to={`/products/${product._id}`}>
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>
      
      {/* Product Info */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="px-1">
          <h3 className="text-[13px] md:text-sm font-bold text-textPrimary line-clamp-2 leading-tight mb-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm md:text-base font-black text-brand">Rs {product.price}</span>
            {oldPrice && (
              <span className="text-[10px] md:text-xs text-textSecondary line-through opacity-60">Rs {oldPrice}</span>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-3">
          {countInCart > 0 ? (
            <div className="flex items-center justify-between rounded-xl bg-brand p-1 text-white shadow-premium">
              <button onClick={handleDecrease} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
                 <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" /></svg>
              </button>
              <span className="text-xs font-black">{countInCart}</span>
              <button onClick={handleIncrease} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 transition-colors">
                 <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full bg-brand text-white rounded-xl py-2 text-[11px] font-black uppercase tracking-wider transition-all hover:bg-brandAccent active:scale-95 shadow-soft"
            >
              Add to Bag
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
