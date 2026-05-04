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

  const mainImage = getOptimizedImageUrl(product, { width: 800 });
  const allImages = product.images?.map(img => {
      if (typeof img === 'string' && img.startsWith('http')) return img;
      return getOptimizedImageUrl({ ...product, imagePath: img });
  }) || [mainImage];

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="bg-bgPremium min-h-screen pb-24 md:pb-12">
      <div className="container-premium section-premium grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Image Gallery */}
        <section className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-premium bg-surface shadow-premium">
            <img
              src={allImages[imageIndex]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setImageIndex(index)} 
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-premium border-2 transition-all ${imageIndex === index ? 'border-brand' : 'border-transparent'}`}
                >
                  <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Product Info */}
        <section className="bg-surface rounded-premium p-6 md:p-10 border border-borderSubtle shadow-soft">
          <span className="text-[10px] font-black uppercase tracking-widest text-brandAccent mb-2 block">
            {product.category || 'Lifestyle Collection'}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-textPrimary leading-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl font-black text-brand">Rs {product.price}</span>
            <div className="h-4 w-px bg-borderSubtle"></div>
            <span className="text-sm font-bold text-textSecondary">⭐ {product.rating} (120+ Reviews)</span>
          </div>

          <div className="prose prose-sm text-textSecondary mb-10 leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-btn border border-borderSubtle bg-bgPremium px-4 py-2">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 text-xl font-bold text-brand">-</button>
                <span className="w-12 text-center font-black text-textPrimary">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-xl font-bold text-brand">+</button>
              </div>
              <button onClick={() => addToCart(product, quantity)} className="btn-primary flex-1">
                {countInCart > 0 ? `In Bag (${countInCart})` : 'Add to Bag'}
              </button>
            </div>
            <button onClick={handleBuyNow} className="btn-secondary w-full">
              Checkout Now
            </button>
          </div>

          {/* Details */}
          <div className="mt-10 pt-10 border-t border-borderSubtle space-y-3">
             <div className="flex justify-between text-xs font-bold">
                <span className="text-textSecondary uppercase tracking-widest">Availability</span>
                <span className="text-success font-black uppercase">In Stock</span>
             </div>
             <div className="flex justify-between text-xs font-bold">
                <span className="text-textSecondary uppercase tracking-widest">Shipping</span>
                <span className="text-textPrimary">Free Express Delivery</span>
             </div>
          </div>
        </section>
      </div>

      {/* Sticky Bottom CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-t border-borderSubtle p-4 md:hidden animate-fade-up">
        <div className="container-premium flex items-center gap-4">
          <div className="flex-1 flex flex-col">
             <span className="text-[10px] font-black text-textSecondary uppercase tracking-widest">Price</span>
             <span className="text-lg font-black text-brand">Rs {product.price}</span>
          </div>
          <button 
            onClick={() => addToCart(product, quantity)} 
            className="btn-primary flex-[2] py-4 shadow-xl"
          >
            {countInCart > 0 ? `Add More (${countInCart})` : 'Add to Bag'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
