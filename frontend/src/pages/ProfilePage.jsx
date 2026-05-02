import { useState, useEffect } from 'react';
import { updateProfile } from '../services/api';
import { useUserStore } from '../store/userStore';

const ProfilePage = () => {
  const { user, setUser } = useUserStore();
  const [shipping, setShipping] = useState({
    doorNo: '',
    streetAddress: '',
    city: '',
    state: 'Tamil Nadu',
    zip: '',
    phone: '',
    altPhone: '',
    country: 'India'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user && user.shippingAddress) {
      setShipping({ ...user.shippingAddress });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const updatedUser = await updateProfile({ shippingAddress: shipping });
      setUser(updatedUser);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-8 text-center">Please login to view your profile.</div>;

  return (
    <div className="mx-auto max-w-2xl mt-10 space-y-6">
      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-800">My Profile</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-zinc-600">Name</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p className="font-semibold text-zinc-600">Email</p>
            <p>{user.email}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-zinc-800 mb-4">Default Shipping Address</h3>
        
        {message && (
          <div className={`p-3 text-sm rounded ${message.includes('success') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-rose-50 text-rose-700 border-rose-200'} border`}>
            {message}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-zinc-700">Door no *</label>
            <input required value={shipping.doorNo} onChange={(e) => setShipping({ ...shipping, doorNo: e.target.value })} className="w-full border border-zinc-300 px-3 py-2 text-sm rounded focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-700">Street Address *</label>
            <input required value={shipping.streetAddress} onChange={(e) => setShipping({ ...shipping, streetAddress: e.target.value })} className="w-full border border-zinc-300 px-3 py-2 text-sm rounded focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-700">Town / City *</label>
            <input required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="w-full border border-zinc-300 px-3 py-2 text-sm rounded focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-700">State / County *</label>
            <select required value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className="w-full border border-zinc-300 px-3 py-2 text-sm rounded focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none">
              <option>Tamil Nadu</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Andhra Pradesh</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-700">Postcode / ZIP *</label>
            <input required value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} className="w-full border border-zinc-300 px-3 py-2 text-sm rounded focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-700">Country / Region *</label>
            <input required value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} className="w-full border border-zinc-300 px-3 py-2 text-sm rounded focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-700">Phone *</label>
            <input required value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} className="w-full border border-zinc-300 px-3 py-2 text-sm rounded focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-700">Alternative Mobile *</label>
            <input required value={shipping.altPhone} onChange={(e) => setShipping({ ...shipping, altPhone: e.target.value })} className="w-full border border-zinc-300 px-3 py-2 text-sm rounded focus:ring-1 focus:ring-rose-500 focus:border-rose-500 outline-none" />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-rose-600 px-6 py-2 text-sm font-bold text-white hover:bg-rose-700 disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Save Address'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
