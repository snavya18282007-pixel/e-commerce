import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { getOptimizedImageUrl } from '../utils/image';

const ProductCard = ({ product }) => {
  const { addToCart, updateQuantity, removeItem, items } = useCartStore();
  const cartItem = items.find((item) => item.product._id === product._id);
  const countInCart = cartItem ? cartItem.quantity : 0;
  
  const displayImage = getOptimizedImageUrl(product);
  const hasDiscount = product.price > 500;

  const handleDecrease = () => {
    if (countInCart === 1) removeItem(product._id);
    else updateQuantity(product._id, countInCart - 1);
  };

  const handleIncrease = () => updateQuantity(product._id, countInCart + 1);

  return (
    <article className="card-app flex flex-col h-full">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-50 mb-3">
        {hasDiscount && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[8px] font-black text-white uppercase tracking-tighter">
            20% OFF
          </span>
        )}
        
        <img
          src={displayImage}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-xs font-bold text-neutral-800 line-clamp-2 leading-tight mb-1">
            {product.name}
          </h3>
          <p className="text-sm font-black text-neutral-900">Rs {product.price}</p>
        </div>
        
        <div className="mt-3">
          {countInCart > 0 ? (
            <div className="flex items-center justify-between rounded-xl bg-neutral-900 p-1 text-white">
              <button onClick={handleDecrease} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10">-</button>
              <span className="text-[10px] font-bold">{countInCart}</span>
              <button onClick={handleIncrease} className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10">+</button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full bg-neutral-100 text-neutral-800 rounded-xl py-2 text-[10px] font-black hover:bg-primary hover:text-white transition-colors"
            >
              Add to Cart
            </button>
          )}
          
          <Link to={`/products/${product._id}`} className="mt-2 block text-center text-[9px] font-bold text-neutral-400 uppercase tracking-widest hover:text-primary transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
