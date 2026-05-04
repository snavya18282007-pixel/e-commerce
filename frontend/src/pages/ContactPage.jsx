const ContactPage = () => {
  return (
    <div className="container-premium section-premium animate-fade-up">
      <div className="max-w-4xl mx-auto grid gap-12 md:grid-cols-2">
        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-textPrimary leading-tight mb-8">
            Let's <br />
            <span className="italic text-brandAccent">Connect.</span>
          </h1>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand/5 flex items-center justify-center text-brand shrink-0">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-textSecondary tracking-widest mb-1">Email Us</p>
                <p className="text-sm font-bold text-textPrimary">support@keerthi.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-brand/5 flex items-center justify-center text-brand shrink-0">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-textSecondary tracking-widest mb-1">Visit Us</p>
                <p className="text-sm font-bold text-textPrimary">Main Street, Hyderabad, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-premium border border-borderSubtle shadow-premium">
          <form className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-textSecondary block mb-1">Your Name</label>
              <input type="text" className="w-full bg-bgPremium border border-borderSubtle rounded-btn px-4 py-3 text-xs font-bold text-textPrimary outline-none focus:ring-1 focus:ring-brand" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-textSecondary block mb-1">Email Address</label>
              <input type="email" className="w-full bg-bgPremium border border-borderSubtle rounded-btn px-4 py-3 text-xs font-bold text-textPrimary outline-none focus:ring-1 focus:ring-brand" placeholder="john@example.com" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-textSecondary block mb-1">Message</label>
              <textarea rows="4" className="w-full bg-bgPremium border border-borderSubtle rounded-btn px-4 py-3 text-xs font-bold text-textPrimary outline-none focus:ring-1 focus:ring-brand" placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" className="btn-primary w-full py-4 uppercase tracking-widest text-[11px] font-black shadow-lg shadow-brand/20">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
