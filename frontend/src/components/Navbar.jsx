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
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="container-base flex flex-wrap items-center gap-3 py-4">
        <Link to="/" className="inline-flex items-center">
          <img
            src={keerthisLogo}
            alt="keerthi's"
            className="h-14 w-auto md:h-16"
          />
        </Link>

        <nav className="order-2 hidden flex-1 items-center justify-center gap-6 text-sm md:flex">
          <Link to="/" className="text-zinc-700 hover:text-accent">Home</Link>
          <div className="group relative">
            <button type="button" className="text-zinc-700 hover:text-accent">
              Category
            </button>
            <div className="invisible absolute left-1/2 top-7 z-50 w-56 -translate-x-1/2 border border-zinc-200 bg-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              {categoryMenu.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => goToCategory(item)}
                  className="block w-full border-b border-zinc-100 px-3 py-2 text-left text-xs text-zinc-700 last:border-b-0 hover:bg-zinc-50 hover:text-accent"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <Link to="/products" className="text-zinc-700 hover:text-accent">Shop</Link>
          <Link to="/orders" className="text-zinc-700 hover:text-accent">Orders</Link>
        </nav>

        <form onSubmit={onSearch} className="order-4 flex w-full gap-2 md:order-3 md:ml-auto md:w-auto md:min-w-[320px]">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-accent focus:outline-none"
            placeholder="Search gift and fancy items"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-zinc-300 px-2 py-2 text-sm focus:border-accent focus:outline-none"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </form>

        <nav className="order-3 ml-auto flex items-center gap-3 text-sm md:order-4">
          {!token ? (
            <Link to="/login" className="text-zinc-700 hover:text-accent font-medium mr-2">Login</Link>
          ) : (
            <div className="group relative">
              <button type="button" className="text-zinc-700 hover:text-accent font-medium mr-2">
                {user?.name?.split(' ')[0] || 'Profile'}
              </button>
              <div className="invisible absolute right-0 top-7 z-50 w-32 border border-zinc-200 bg-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                <Link to="/profile" className="block w-full border-b border-zinc-100 px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50 hover:text-accent">Profile</Link>
                <button onClick={() => { logout(); navigate('/'); }} className="block w-full px-3 py-2 text-left text-xs text-zinc-700 hover:bg-zinc-50 hover:text-rose-600">Logout</button>
              </div>
            </div>
          )}
          <Link to="/cart" className="relative rounded-md border border-zinc-300 px-3 py-2 text-zinc-700 hover:border-accent hover:text-accent">
            Cart
            {count > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-accent px-2 py-0.5 text-xs text-white">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
