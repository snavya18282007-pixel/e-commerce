import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-bgPremium border-t border-borderSubtle pt-20 pb-10">
      <div className="container-premium">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-full lg:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tighter text-brand">
              KEERTHI<span className="text-brandAccent">.</span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-textSecondary font-medium">
              Curated rustic essentials for the modern lifestyle. Handpicked quality delivered with purpose.
            </p>
            <div className="mt-8 flex gap-4">
              {['FB', 'IG', 'LI'].map((social) => (
                <a key={social} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-borderSubtle text-textSecondary transition-all hover:bg-brand hover:text-white hover:border-brand">
                  <span className="text-[10px] font-black">{social}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-textPrimary">Shop</h3>
            <ul className="mt-6 space-y-4 text-xs font-bold text-textSecondary">
              <li><Link to="/products" className="hover:text-brand transition-colors">All Collections</Link></li>
              <li><Link to="/products?category=Gift%20Items" className="hover:text-brand transition-colors">Gift Sets</Link></li>
              <li><Link to="/products?category=Stationaries" className="hover:text-brand transition-colors">Essentials</Link></li>
              <li><Link to="/products?category=Fancy%20Items" className="hover:text-brand transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-textPrimary">Support</h3>
            <ul className="mt-6 space-y-4 text-xs font-bold text-textSecondary">
              <li><Link to="/orders" className="hover:text-brand transition-colors">Track Order</Link></li>
              <li><Link to="/profile" className="hover:text-brand transition-colors">Your Account</Link></li>
              <li><a href="#" className="hover:text-brand transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Terms of Use</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-textPrimary">Newsletter</h3>
            <p className="mt-6 text-xs font-bold text-textSecondary">Join our patron list for curated updates.</p>
            <form className="mt-4 flex gap-2">
              <input type="email" placeholder="Email Address" className="w-full rounded-btn bg-surface border border-borderSubtle px-4 py-3 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-brand" />
              <button type="submit" className="rounded-btn bg-brand px-6 py-3 text-xs font-black text-white hover:bg-brandAccent transition-colors">Join</button>
            </form>
          </div>
        </div>
        
        <div className="mt-20 border-t border-borderSubtle pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black text-textSecondary uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Keerthi's Store. All rights reserved.
          </p>
          <div className="flex gap-8 opacity-40 grayscale">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6" />
            <img src="https://img.icons8.com/color/48/000000/google-pay.png" alt="GPay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
