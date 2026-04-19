import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
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
    <div className="space-y-5">
      <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-zinc-700">
          Showing {startItem}-{endItem} of {totalItems} results
        </p>
        <select value={sort} onChange={(e) => updateParams({ sort: e.target.value })} className="w-full rounded-none border border-zinc-300 bg-white px-3 py-2 text-sm md:w-52">
          <option value="latest">Sort by latest</option>
          <option value="price_asc">Sort by price: low to high</option>
          <option value="price_desc">Sort by price: high to low</option>
          <option value="rating">Sort by rating</option>
        </select>
      </div>

      {loading ? <LoadingSpinner /> : error ? <ErrorState message={error} /> : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      )}

      <div className="flex items-center justify-center gap-2">
        <button disabled={page <= 1} onClick={() => updateParams({ page: page - 1 })} className="rounded border border-zinc-300 px-3 py-1 text-sm text-zinc-700 disabled:opacity-50">Prev</button>
        <span className="text-sm text-zinc-600">Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => updateParams({ page: page + 1 })} className="rounded border border-zinc-300 px-3 py-1 text-sm text-zinc-700 disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

export default ProductListingPage;
