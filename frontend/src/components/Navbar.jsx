import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    } else {
      navigate('/products');
    }
  };

  return (
    <header className="glass-nav h-16 md:h-20">
      <div className="container-premium h-full flex items-center justify-between gap-4">
        {/* Search Bar - Left */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-[140px] md:max-w-xs items-center rounded-full bg-bgPremium px-3 py-1.5 md:px-4 md:py-2 border border-borderSubtle focus-within:ring-1 focus-within:ring-brand/20 transition-all">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs font-bold text-textPrimary outline-none placeholder:text-textSecondary/50"
          />
          <button type="submit" className="text-textSecondary hover:text-brand transition-colors">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {/* Logo Focus - Center */}
        <Link to="/" className="hidden sm:block absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-black tracking-tighter text-brand">
          KEERTHI<span className="text-brandAccent">.</span>
        </Link>
        {/* Mobile Logo (Smaller, not absolute) */}
        <Link to="/" className="sm:hidden text-lg font-black tracking-tighter text-brand">
          K<span className="text-brandAccent">.</span>
        </Link>

        {/* Cart - Right */}
        <Link to="/cart" className="relative text-textSecondary hover:text-brand transition-colors p-2 flex-shrink-0">
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
