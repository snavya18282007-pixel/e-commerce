import { useMemo, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';

const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAccountOpen, setIsAccountOpen] = useState(false);

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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="glass-nav h-16 md:h-20 sticky top-0 z-[100]">
      <div className="container-premium h-full flex items-center justify-between gap-4">
        
        {/* Left: Search & Nav Links (Desktop) */}
        <div className="flex items-center gap-8 flex-1">
          {/* Logo */}
          <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter text-brand shrink-0">
            KEERTHI<span className="text-brandAccent">.</span>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
                  location.pathname === link.path ? 'text-brandAccent' : 'text-textSecondary hover:text-brand'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Search, Account, Cart */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center rounded-full bg-bgPremium px-4 py-2 border border-borderSubtle focus-within:ring-1 focus-within:ring-brand/20 transition-all max-w-[180px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-[10px] font-bold text-textPrimary outline-none placeholder:text-textSecondary/50"
            />
            <button type="submit" className="text-textSecondary hover:text-brand transition-colors">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Account Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-textSecondary hover:text-brand transition-colors"
            >
              {user ? 'Account' : 'Login'}
              <svg className={`h-3 w-3 transition-transform ${isAccountOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isAccountOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-xl bg-surface border border-borderSubtle shadow-premium p-2 animate-fade-in">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-borderSubtle mb-2">
                      <p className="text-[10px] font-bold text-textSecondary uppercase">Logged in as</p>
                      <p className="text-xs font-black text-textPrimary truncate">{user.name}</p>
                    </div>
                    <Link to="/orders" className="block px-4 py-2 text-[10px] font-black text-textSecondary hover:text-brand hover:bg-bgPremium rounded-lg uppercase tracking-widest">My Orders</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-[10px] font-black text-brandAccent hover:bg-brand/5 rounded-lg uppercase tracking-widest">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-2 text-[10px] font-black text-textSecondary hover:text-brand hover:bg-bgPremium rounded-lg uppercase tracking-widest">Sign In</Link>
                    <Link to="/register" className="block px-4 py-2 text-[10px] font-black text-textSecondary hover:text-brand hover:bg-bgPremium rounded-lg uppercase tracking-widest">Create Account</Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative text-textSecondary hover:text-brand transition-colors p-2 shrink-0">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brandAccent text-[8px] font-bold text-white ring-2 ring-surface">
              {count}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
