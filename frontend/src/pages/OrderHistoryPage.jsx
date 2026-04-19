import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { getOrdersByUser } from '../services/api';
import { getSocket } from '../services/socket';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';

const OrderHistoryPage = () => {
  const user = useUserStore((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOrdersByUser(user._id);
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user._id]);

  useEffect(() => {
    const socket = getSocket();
    socket.emit('join:user', user._id);

    const onOrderUpdate = (incomingOrder) => {
      setOrders((prev) => {
        const index = prev.findIndex((order) => order._id === incomingOrder._id);
        if (index === -1) return [incomingOrder, ...prev];
        const copy = [...prev];
        copy[index] = incomingOrder;
        return copy;
      });
    };

    socket.on('order:update', onOrderUpdate);
    return () => {
      socket.off('order:update', onOrderUpdate);
    };
  }, [user._id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Order History</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="rounded-lg border border-zinc-200 bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">Order #{order._id.slice(-6)}</p>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs uppercase">{order.status}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-600">Total: Rs {order.totalPrice.toFixed(2)}</p>
            <p className="text-xs text-zinc-500">Payment: {order.paymentStatus || 'pending'}</p>
            <p className="text-xs text-zinc-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
