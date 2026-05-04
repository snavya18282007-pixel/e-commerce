import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import keerthisLogo from '../assets/keerthis-logo-transparent.png';

const categories = ['All', 'Stationaries', 'Gift Items', 'Fancy Items'];
const categoryMenu = [
  'Stationaries',
  'Gift Items',
  'Fancy Items',
  'Home Decor Gifts',
  'Return Gifts',
  'Festival Hampers',
  'Greeting Cards',
  'Wrapping Supplies'
];

const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const { user, token, logout } = useUserStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const onSearch = (event) => {
    event.preventDefault();
    navigate(`/products?search=${encodeURIComponent(search)}&category=${category}`);
  };

  const goToCategory = (value) => {
    setCategory(value);
    navigate(`/products?category=${encodeURIComponent(value)}&page=1`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
      <div className="container-base flex items-center justify-between py-3 md:py-4">
        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center transition-transform hover:scale-105">
          <img
            src={keerthisLogo}
            alt="keerthi's"
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-accent">Home</Link>
          <div className="group relative">
            <button type="button" className="flex items-center gap-1 text-sm font-semibold text-zinc-600 transition-colors hover:text-accent">
              Categories
              <svg className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-100 bg-white p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
              {categoryMenu.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => goToCategory(item)}
                  className="block w-full rounded-lg px-4 py-2.5 text-left text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-accent transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <Link to="/products" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-accent">Shop</Link>
          <Link to="/orders" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-accent">Orders</Link>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <form onSubmit={onSearch} className="hidden md:flex items-center rounded-full bg-zinc-100 px-4 py-2 transition-focus-within focus-within:bg-white focus-within:ring-2 focus-within:ring-accent/20">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm font-medium text-zinc-700 outline-none placeholder:text-zinc-400 w-40 lg:w-60"
              placeholder="Search gifts..."
            />
            <button type="submit" className="text-zinc-400 hover:text-accent">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          <div className="flex items-center gap-2 md:gap-4">
            {!token ? (
              <Link to="/login" className="hidden sm:block text-sm font-bold text-zinc-900 hover:text-accent transition-colors">Login</Link>
            ) : (
              <div className="group relative">
                <button type="button" className="flex items-center gap-1 text-sm font-bold text-zinc-900 hover:text-accent transition-colors">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                </button>
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-zinc-100 bg-white p-2 opacity-0 shadow-2xl transition-all group-hover:visible group-hover:opacity-100">
                  <Link to="/profile" className="block w-full rounded-lg px-4 py-2.5 text-left text-xs font-medium text-zinc-600 hover:bg-zinc-50 hover:text-accent">Profile</Link>
                  <button onClick={() => { logout(); navigate('/'); }} className="block w-full rounded-lg px-4 py-2.5 text-left text-xs font-medium text-rose-500 hover:bg-rose-50">Logout</button>
                </div>
              </div>
            )}
            
            <Link to="/cart" className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition-colors hover:bg-accent hover:text-white">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
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
