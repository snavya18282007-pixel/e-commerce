import { useMemo } from 'react';
import { useCartStore } from '../store/cartStore';
import { Link, useNavigate } from 'react-router-dom';
import { getOptimizedImageUrl } from '../utils/image';

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore((state) => state);
  const navigate = useNavigate();
  const total = useMemo(() => totalPrice(), [items, totalPrice]);

  if (!items.length) {
    return (
      <div className="card-premium flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="h-24 w-24 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-6">
          <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900">Your cart is empty</h2>
        <p className="mt-2 text-zinc-500 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="btn-primary mt-8">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Shopping Cart</h1>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product._id} className="card-premium flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <img
                src={getOptimizedImageUrl(item.product, { width: 200 })}
                alt={item.product.name}
                className="h-24 w-24 rounded-xl object-cover bg-zinc-50"
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-zinc-900 truncate">{item.product.name}</h2>
                <p className="text-sm text-accent font-semibold mt-1">Rs {item.product.price}</p>
                <div className="mt-4 flex items-center gap-4 sm:hidden">
                   <div className="flex items-center rounded-full bg-zinc-100 px-1">
                    <button onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white transition-colors">-</button>
                    <span className="text-xs font-bold w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white transition-colors">+</button>
                  </div>
                  <button onClick={() => removeItem(item.product._id)} className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                    Remove
                  </button>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-6">
                <div className="flex items-center rounded-full bg-zinc-100 px-1">
                  <button onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white transition-colors">-</button>
                  <span className="text-sm font-bold w-10 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white transition-colors">+</button>
                </div>
                <button onClick={() => removeItem(item.product._id)} className="text-zinc-400 hover:text-rose-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <div className="card-premium p-6">
            <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4 mb-4">Order Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900">Rs {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Shipping</span>
                <span className="text-emerald-500 font-bold uppercase text-[10px]">Free</span>
              </div>
              <div className="border-t border-zinc-100 pt-4 flex justify-between text-base font-bold text-zinc-900">
                <span>Total</span>
                <span>Rs {total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')} 
              className="btn-primary w-full mt-8"
            >
              Checkout Now
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure Transaction
            </div>
          </div>
          
          <div className="card-premium p-4 flex items-center gap-4">
             <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
               <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
               </svg>
             </div>
             <div>
               <p className="text-xs font-bold text-zinc-900 uppercase tracking-tight">Satisfaction Guaranteed</p>
               <p className="text-[10px] text-zinc-500">Easy 7-day return policy</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
