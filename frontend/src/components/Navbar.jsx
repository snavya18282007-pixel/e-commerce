import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';

const categories = ['All', 'Stationaries', 'Gift Items', 'Fancy Items'];

const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const { user, token, logout } = useUserStore();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const onSearch = (event) => {
    event.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
      <div className="container-base flex h-18 items-center justify-between gap-4">
        {/* Logo - Text based as requested */}
        <Link to="/" className="flex items-center gap-2 transition-smooth hover:scale-105">
          <span className="text-xl font-black tracking-tighter text-neutral-900">
            KEERTHI<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-sm font-bold text-neutral-500 hover:text-primary transition-colors">Home</Link>
          <Link to="/products" className="text-sm font-bold text-neutral-500 hover:text-primary transition-colors">Shop</Link>
        </nav>

        {/* Search & Actions */}
        <div className="flex flex-1 items-center justify-end gap-4 md:gap-8">
          <form onSubmit={onSearch} className="hidden lg:flex flex-1 max-w-sm items-center rounded-xl bg-neutral-100 px-4 py-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <svg className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-3 w-full bg-transparent text-sm font-bold text-neutral-700 outline-none placeholder:text-neutral-400"
              placeholder="Search items..."
            />
          </form>

          <div className="flex items-center gap-4">
            {!token ? (
              <Link to="/login" className="text-sm font-black text-neutral-900 hover:text-primary transition-colors">Login</Link>
            ) : (
              <div className="group relative">
                <button type="button" className="flex items-center gap-1">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                </button>
                <div className="invisible absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-neutral-100 bg-white p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                  <Link to="/profile" className="block w-full rounded-lg px-4 py-2.5 text-left text-xs font-bold text-neutral-600 hover:bg-neutral-50 hover:text-primary transition-colors">Profile</Link>
                  <button onClick={() => { logout(); navigate('/'); }} className="block w-full rounded-lg px-4 py-2.5 text-left text-xs font-bold text-danger hover:bg-danger/5 transition-colors">Logout</button>
                </div>
              </div>
            )}
            
            <Link to="/cart" className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-smooth hover:bg-primary hover:text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-lg bg-danger text-[10px] font-black text-white ring-2 ring-white shadow-lg shadow-danger/30">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
