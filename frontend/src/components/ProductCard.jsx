import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { getOptimizedImageUrl } from '../utils/image';

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, removeItem, items } = useCartStore();
  const cartItem = items.find((item) => item.product._id === product._id);
  const countInCart = cartItem ? cartItem.quantity : 0;
  
  const displayImage = getOptimizedImageUrl(product, { width: 500 });
  const hasDiscount = product.price > 500;

  const handleDecrease = () => {
    if (countInCart === 1) removeItem(product._id);
    else updateQuantity(product._id, countInCart - 1);
  };

  const handleIncrease = () => updateQuantity(product._id, countInCart + 1);

  return (
    <article className="card-premium flex flex-col group animate-fade-up">
      <div className="relative overflow-hidden">
        {hasDiscount && (
          <div className="absolute left-4 top-4 z-10">
            <span className="bg-brand Accent text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full shadow-lg">
              BEST SELLER
            </span>
          </div>
        )}
        
        <Link to={`/products/${product._id}`}>
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            className="image-edge transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-bold text-textPrimary leading-tight line-clamp-1">
            {product.name}
          </h3>
          <span className="text-xs font-black text-brandAccent">Rs {product.price}</span>
        </div>
        
        <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold mb-4">
          {product.category || 'Lifestyle'}
        </p>
        
        <div className="mt-auto pt-2">
          {countInCart > 0 ? (
            <div className="flex items-center justify-between rounded-btn bg-brand p-1 text-white shadow-premium">
              <button onClick={handleDecrease} className="flex h-10 w-10 items-center justify-center rounded-premium hover:bg-white/10 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" /></svg>
              </button>
              <span className="text-sm font-black">{countInCart}</span>
              <button onClick={handleIncrease} className="flex h-10 w-10 items-center justify-center rounded-premium hover:bg-white/10 transition-colors">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full bg-textPrimary text-white rounded-btn py-3 text-xs font-black uppercase tracking-widest shadow-soft hover:bg-brand transition-all active:scale-95"
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
