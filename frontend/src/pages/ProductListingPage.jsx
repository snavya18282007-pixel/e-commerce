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
    <div className="container-base section-padding">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-black text-neutral-900">
            {category === 'All' ? 'All Products' : category}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Showing {startItem}-{endItem} of {totalItems} items
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <select 
            value={sort} 
            onChange={(e) => updateParams({ sort: e.target.value })} 
            className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-bold text-neutral-700 outline-none focus:border-primary"
          >
            <option value="latest">Sort: Latest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {error ? (
        <ErrorState message={error} />
      ) : (
        <div className="grid-products">
          {loading ? (
            [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
          ) : products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-lg text-neutral-500 font-medium">No items found.</p>
              <button onClick={() => updateParams({ category: 'All', search: '', sort: 'latest' })} className="mt-4 text-primary font-bold">Clear Filters</button>
            </div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-16 pt-10 border-t border-neutral-100">
          <button 
            disabled={page <= 1} 
            onClick={() => updateParams({ page: page - 1 })} 
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 disabled:opacity-30"
          >
            &larr;
          </button>
          
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => updateParams({ page: i + 1 })}
                className={`h-10 w-10 rounded-xl text-sm font-bold transition-all ${page === i + 1 ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:bg-neutral-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={page >= totalPages} 
            onClick={() => updateParams({ page: page + 1 })} 
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-400 disabled:opacity-30"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
