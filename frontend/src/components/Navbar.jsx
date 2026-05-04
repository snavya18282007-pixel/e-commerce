import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';

const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const { token } = useUserStore();
  const navigate = useNavigate();

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <div className="container-app h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-lg font-black tracking-tighter text-neutral-900">
          KEERTHI<span className="text-primary">.</span>
        </Link>

        {/* Action Icons */}
        <div className="flex items-center gap-5">
          <button onClick={() => navigate('/products')} className="text-neutral-500 hover:text-primary transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {!token ? (
             <Link to="/login" className="text-neutral-500 hover:text-primary transition-colors">
               <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
             </Link>
          ) : (
            <Link to="/profile" className="text-neutral-500 hover:text-primary transition-colors">
               <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
             </Link>
          )}

          <Link to="/cart" className="relative text-neutral-500 hover:text-primary transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
