import { useMemo, useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCartStore((state) => state);
  const navigate = useNavigate();
  const total = useMemo(() => totalPrice(), [items, totalPrice]);

  if (!items.length) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center text-zinc-600">
        Your cart is empty. <Link to="/products" className="text-accent">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Cart</h1>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.product._id} className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center">
            <img
              src={item.product.images?.[0] || 'https://placehold.co/300x200?text=Product'}
              alt={item.product.name}
              className="h-20 w-24 rounded object-cover"
            />
            <div className="flex-1">
              <h2 className="font-medium">{item.product.name}</h2>
              <p className="text-sm text-zinc-600">Rs {item.product.price}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.product._id, Number(e.target.value))}
              className="w-20 rounded border border-zinc-300 px-2 py-1"
            />
            <button onClick={() => removeItem(item.product._id)} className="text-sm text-red-600">
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-zinc-200 bg-white p-4">
        <p className="text-lg font-semibold">Total: Rs {total.toFixed(2)}</p>
        <button onClick={() => navigate('/checkout')} className="mt-3 rounded-md bg-accent px-4 py-2 text-white">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
