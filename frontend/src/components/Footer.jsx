import { Link } from 'react-router-dom';
import keerthisLogo from '../assets/keerthis-logo-transparent.png';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-zinc-200 bg-white pt-16 pb-8">
      <div className="container-base">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-full lg:col-span-1">
            <Link to="/" className="inline-flex items-center">
              <img src={keerthisLogo} alt="keerthi's" className="h-12 w-auto" />
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              Discover trendy stationaries, premium gift bundles, and fancy accessories curated for birthdays, weddings, and festive moments.
            </p>
            <div className="mt-6 flex gap-4">
              {['Facebook', 'Instagram', 'Twitter'].map((social) => (
                <a key={social} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:border-accent hover:text-accent">
                  <span className="sr-only">{social}</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.411 2.865 8.139 6.839 9.465.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.136 22 16.411 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">Shop</h3>
            <ul className="mt-6 space-y-4 text-sm text-zinc-500">
              <li><Link to="/products" className="hover:text-accent">All Products</Link></li>
              <li><Link to="/products?category=Gift%20Items" className="hover:text-accent">Gift Items</Link></li>
              <li><Link to="/products?category=Stationaries" className="hover:text-accent">Stationaries</Link></li>
              <li><Link to="/products?category=Fancy%20Items" className="hover:text-accent">Fancy Items</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">Support</h3>
            <ul className="mt-6 space-y-4 text-sm text-zinc-500">
              <li><Link to="/orders" className="hover:text-accent">Order History</Link></li>
              <li><Link to="/profile" className="hover:text-accent">Your Account</Link></li>
              <li><a href="#" className="hover:text-accent">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-accent">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">Newsletter</h3>
            <p className="mt-6 text-sm text-zinc-500">Join our mailing list for updates and offers.</p>
            <form className="mt-4 flex gap-2">
              <input type="email" placeholder="Email address" className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:border-accent focus:outline-none" />
              <button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800">Go</button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 border-t border-zinc-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} Keerthi's Store. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-zinc-400">
            <a href="#" className="hover:text-zinc-600">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-600">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
