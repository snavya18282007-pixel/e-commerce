import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-20 pb-10">
      <div className="container-base">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-full lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tighter text-neutral-900">
                KEERTHI<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-neutral-400 font-medium">
              A premium shopping destination for gift and fancy items. Delivering joy to your doorstep since 2026.
            </p>
            <div className="mt-8 flex gap-4">
              {['FB', 'IG', 'TW'].map((social) => (
                <a key={social} href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-100 text-neutral-400 transition-smooth hover:border-primary hover:text-primary hover:bg-primary/5">
                  <span className="text-[10px] font-black tracking-tighter">{social}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-neutral-900">Company</h3>
            <ul className="mt-6 space-y-4 text-xs font-bold text-neutral-400">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-neutral-900">Support</h3>
            <ul className="mt-6 space-y-4 text-xs font-bold text-neutral-400">
              <li><Link to="/orders" className="hover:text-primary transition-colors">Order History</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">Account</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-neutral-900">Newsletter</h3>
            <p className="mt-6 text-xs font-bold text-neutral-400">Subscribe for early access and offers.</p>
            <form className="mt-4 flex gap-2">
              <input type="email" placeholder="Email" className="w-full rounded-xl border border-neutral-100 bg-neutral-50 px-4 py-2 text-xs font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <button type="submit" className="rounded-xl bg-neutral-900 px-4 py-2 text-xs font-black text-white hover:bg-neutral-800 transition-colors">Join</button>
            </form>
          </div>
        </div>
        
        <div className="mt-20 border-t border-neutral-100 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">&copy; {new Date().getFullYear()} Keerthi's Store. Designed for conversion.</p>
          <div className="flex gap-8">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
            <img src="https://img.icons8.com/color/48/000000/google-pay.png" alt="GPay" className="h-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
