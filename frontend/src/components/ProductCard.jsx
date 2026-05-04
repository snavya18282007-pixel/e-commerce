import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { getOptimizedImageUrl } from '../utils/image';

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, removeItem, items } = useCartStore();
  const cartItem = items.find((item) => item.product._id === product._id);
  const countInCart = cartItem ? cartItem.quantity : 0;
  
  const displayImage = getOptimizedImageUrl(product);
  
  // Design system specs
  const rating = product.rating || 4.5;
  const hasDiscount = product.price > 500;
  const discountPercent = 20;
  const oldPrice = hasDiscount ? Math.round(product.price * (1 + discountPercent / 100)) : null;

  const handleDecrease = () => {
    if (countInCart === 1) removeItem(product._id);
    else updateQuantity(product._id, countInCart - 1);
  };

  const handleIncrease = () => updateQuantity(product._id, countInCart + 1);

  return (
    <article className="card-premium group flex flex-col p-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-50 mb-4">
        {hasDiscount && (
          <span className="absolute left-3 top-3 z-10 rounded-lg bg-danger px-2 py-1 text-[10px] font-black text-white uppercase shadow-lg shadow-danger/20">
            {discountPercent}% OFF
          </span>
        )}
        {product.rating > 4.7 && !hasDiscount && (
          <span className="absolute left-3 top-3 z-10 rounded-lg bg-success px-2 py-1 text-[10px] font-black text-white uppercase shadow-lg shadow-success/20">
            Best Seller
          </span>
        )}
        
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">{product.category || 'Collection'}</p>
          <div className="flex items-center gap-0.5">
            <span className="text-[11px] font-bold text-neutral-900">⭐ {rating}</span>
          </div>
        </div>
        
        <h3 className="text-sm font-bold text-neutral-800 line-clamp-1 group-hover:text-primary transition-colors mb-2">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col">
             <div className="flex items-center gap-2">
              <span className="text-base font-black text-neutral-900">Rs {product.price}</span>
              {oldPrice && (
                <span className="text-xs text-neutral-400 line-through">Rs {oldPrice}</span>
              )}
            </div>
            <span className="text-[10px] font-bold text-success mt-0.5">In Stock</span>
          </div>

          <div className="flex items-center gap-2">
            {countInCart > 0 ? (
              <div className="flex items-center rounded-lg bg-neutral-900 px-1 py-0.5 text-white">
                <button onClick={handleDecrease} className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/10">-</button>
                <span className="text-xs font-bold w-6 text-center">{countInCart}</span>
                <button onClick={handleIncrease} className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-white/10">+</button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product, 1)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-all hover:bg-primaryDark hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            )}
            
            <Link to={`/products/${product._id}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 hover:border-neutral-300 hover:bg-neutral-50 transition-all">
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
