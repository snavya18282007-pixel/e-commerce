import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, addProductReview } from '../services/api';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
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
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  const { token, user } = useUserStore();

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

  const submitReview = async (e) => {
    e.preventDefault();
    if (!token) return navigate('/login');
    try {
      setReviewLoading(true);
      setReviewError('');
      await addProductReview(id, { rating, comment });
      setReviewSuccess('Review submitted successfully!');
      setComment('');
      // Reload product to show new review
      const data = await getProductById(id);
      setProduct(data.product);
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

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

      {/* Reviews Section */}
      <section className="container-premium mt-12 pt-12 border-t border-borderSubtle">
        <h2 className="text-2xl font-black text-textPrimary mb-8 text-center md:text-left">Customer Reviews</h2>
        
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Review List */}
          <div className="lg:col-span-2 space-y-8">
            {product.reviews?.length === 0 ? (
              <div className="text-center py-12 bg-bgPremium rounded-premium border border-dashed border-borderSubtle">
                <p className="text-textSecondary italic">No reviews yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {product.reviews?.map((review) => (
                  <div key={review._id} className="bg-surface p-6 rounded-premium border border-borderSubtle shadow-soft transition-smooth hover:shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="font-black text-textPrimary block">{review.name}</span>
                        <div className="flex text-brandAccent mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-borderSubtle fill-none stroke-current'}`} viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-textSecondary uppercase tracking-widest">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-textSecondary leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-premium p-6 border border-borderSubtle shadow-soft h-fit sticky top-24">
              <h3 className="text-lg font-black text-textPrimary mb-4">Share Your Feedback</h3>
              {reviewSuccess && <p className="mb-4 text-xs font-bold text-success uppercase text-center bg-success/10 py-2 rounded-lg">{reviewSuccess}</p>}
              {reviewError && <p className="mb-4 text-xs font-bold text-brand uppercase text-center bg-brand/10 py-2 rounded-lg">{reviewError}</p>}
              
              {!token ? (
                <div className="text-center py-4">
                  <p className="text-xs text-textSecondary mb-4">Please login to write a review.</p>
                  <button onClick={() => navigate('/login')} className="btn-secondary w-full py-3 text-xs">Login Now</button>
                </div>
              ) : (
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-textSecondary block mb-1">Overall Rating</label>
                    <select 
                      value={rating} 
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full bg-bgPremium border border-borderSubtle rounded-btn px-4 py-3 text-xs font-bold text-textPrimary outline-none focus:ring-1 focus:ring-brand"
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Poor</option>
                      <option value="1">1 - Terrible</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-textSecondary block mb-1">Your Comment</label>
                    <textarea 
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What did you like or dislike about this product?"
                      className="w-full bg-bgPremium border border-borderSubtle rounded-btn px-4 py-3 text-xs font-bold text-textPrimary outline-none focus:ring-1 focus:ring-brand placeholder:text-textSecondary/30"
                      required
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={reviewLoading}
                    className="btn-primary w-full py-4 shadow-lg shadow-brand/20"
                  >
                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
