import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';

const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const category = searchParams.get('category') || 'All';
  const sort = searchParams.get('sort') || 'latest';
  const search = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sortMap = useMemo(() => ({
    latest: '-createdAt',
    price_asc: 'price',
    price_desc: '-price',
    rating: '-rating'
  }), []);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getProducts({
          page,
          limit: 12,
          category: category === 'All' ? undefined : category,
          sort: sortMap[sort],
          search
        });
        setProducts(data.products || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalItems(data.pagination?.total || 0);
      } catch (err) {
        setError(err.message || 'Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, category, sort, search, sortMap]);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });
    if (!updates.page) next.set('page', '1');
    setSearchParams(next);
  };

  const startItem = totalItems === 0 ? 0 : (page - 1) * 12 + 1;
  const endItem = Math.min(page * 12, totalItems);

  return (
    <div className="bg-bgPremium min-h-screen">
      {/* Header Info */}
      <div className="container-premium pt-6 pb-4">
        <div className="flex flex-col gap-4 border-b border-borderSubtle pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-textPrimary uppercase tracking-tight">
              {category === 'All' ? 'Collections' : category}
            </h1>
            <p className="text-[10px] md:text-xs font-bold text-textSecondary uppercase tracking-widest mt-1">
              {totalItems} Items Found
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['All', 'Stationaries', 'Gift Sets', 'Fancy Items'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateParams({ category: cat, page: 1 })}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${category === cat ? 'bg-brand text-white' : 'bg-white text-textSecondary border border-borderSubtle'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
             
             <select 
               value={sort} 
               onChange={(e) => updateParams({ sort: e.target.value })} 
               className="rounded-full border border-borderSubtle bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-textPrimary outline-none focus:border-brand"
             >
               <option value="latest">Sort</option>
               <option value="price_asc">Price: Low</option>
               <option value="price_desc">Price: High</option>
             </select>
          </div>
        </div>
      </div>

      {/* Product Grid - Dense 2-column mobile */}
      <div className="container-premium py-4">
        {error ? (
          <ErrorState message={error} />
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {loading ? (
              [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
            ) : products.length > 0 ? (
              products.map((product) => <ProductCard key={product._id} product={product} />)
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-sm text-textSecondary font-bold uppercase tracking-widest">No matching items.</p>
                <button onClick={() => updateParams({ category: 'All', search: '' })} className="mt-4 text-brand font-black underline underline-offset-4 text-xs">Clear All Filters</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="container-premium py-12 flex items-center justify-center gap-2">
          <button 
            disabled={page <= 1} 
            onClick={() => updateParams({ page: page - 1 })} 
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-borderSubtle text-brand disabled:opacity-30"
          >
             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <div className="flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => updateParams({ page: i + 1 })}
                className={`h-10 w-10 rounded-xl text-[11px] font-black transition-all ${page === i + 1 ? 'bg-brand text-white' : 'bg-white text-textSecondary border border-borderSubtle hover:bg-bgPremium'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={page >= totalPages} 
            onClick={() => updateParams({ page: page + 1 })} 
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-borderSubtle text-brand disabled:opacity-30"
          >
             <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
