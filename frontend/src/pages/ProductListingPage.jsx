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
          limit: 8,
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

  const startItem = totalItems === 0 ? 0 : (page - 1) * 8 + 1;
  const endItem = Math.min(page * 8, totalItems);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {category === 'All' ? 'All Products' : category}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Showing {startItem}-{endItem} of {totalItems} results
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Sort By</label>
          <select 
            value={sort} 
            onChange={(e) => updateParams({ sort: e.target.value })} 
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
          >
            <option value="latest">Latest Arrivals</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {error ? (
        <ErrorState message={error} />
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
          ) : products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-lg text-zinc-500 font-medium">No products found matching your criteria.</p>
              <button onClick={() => updateParams({ category: 'All', search: '', sort: 'latest' })} className="mt-4 text-accent font-bold underline underline-offset-4">Clear all filters</button>
            </div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-10 border-t border-zinc-100">
          <button 
            disabled={page <= 1} 
            onClick={() => updateParams({ page: page - 1 })} 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all hover:bg-zinc-50 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => updateParams({ page: i + 1 })}
                className={`h-10 w-10 rounded-full text-sm font-bold transition-all ${page === i + 1 ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={page >= totalPages} 
            onClick={() => updateParams({ page: page + 1 })} 
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-all hover:bg-zinc-50 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
