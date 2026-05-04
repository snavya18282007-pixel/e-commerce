import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <header className="glass-nav h-16 md:h-20">
      <div className="container-premium h-full flex items-center justify-between">
        {/* Minimal Search - Left */}
        <button onClick={() => navigate('/products')} className="text-textSecondary hover:text-brand transition-colors p-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Logo Focus - Center */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-2xl font-black tracking-tighter text-brand">
          KEERTHI<span className="text-brandAccent">.</span>
        </Link>

        {/* Cart - Right */}
        <Link to="/cart" className="relative text-textSecondary hover:text-brand transition-colors p-2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {count > 0 && (
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brandAccent text-[8px] font-bold text-white ring-2 ring-surface">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
