import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCartStore((state) => state);
  const user = useUserStore((state) => state.user);
  const [shipping, setShipping] = useState({
    fullName: '',
    doorNo: '',
    streetAddress: '',
    city: '',
    state: 'Tamil Nadu',
    zip: '',
    phone: '',
    altPhone: '',
    email: '',
    country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiTxnId, setUpiTxnId] = useState('');
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [pendingPayload, setPendingPayload] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const subtotal = useMemo(() => totalPrice(), [items, totalPrice]);
  const shippingCharge = items.length ? 50 : 0;
  const total = subtotal + shippingCharge;
  const upiId = import.meta.env.VITE_UPI_ID || 'keerthisgiftshop@upi';
  const payeeName = "Keerthi's Gift Shop";
  const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${encodeURIComponent(total.toFixed(2))}&cu=INR`;
  const upiQrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(upiLink)}&size=220`;

  const onSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      userId: user._id,
      shipping: {
        fullName: shipping.fullName,
        address: `${shipping.doorNo}, ${shipping.streetAddress}`,
        city: shipping.city,
        state: shipping.state,
        zip: shipping.zip,
        phone: shipping.phone,
        altPhone: shipping.altPhone,
        email: shipping.email,
        country: shipping.country
      },
      paymentMethod,
      upiTransactionId: paymentMethod === 'upi' ? upiTxnId.trim() : undefined,
      items: items.map((item) => ({ productId: item.product._id, quantity: item.quantity })),
      totalPrice: total
    };

    if (paymentMethod === 'upi') {
      setPendingPayload(payload);
      setShowUpiModal(true);
      return;
    }

    setSubmitting(true);
    try {
      await createOrder(payload);
      clearCart();
      navigate('/orders');
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const completeUpiPayment = async () => {
    if (!upiTxnId.trim()) {
      alert('Enter UPI transaction ID to continue.');
      return;
    }
    if (!pendingPayload) return;

    setSubmitting(true);
    try {
      await createOrder({
        ...pendingPayload,
        upiTransactionId: upiTxnId.trim()
      });
      clearCart();
      setShowUpiModal(false);
      navigate('/orders');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
      <form id="checkout-form" onSubmit={onSubmit} className="space-y-3 rounded-lg border border-zinc-200 bg-white p-5">
        <div>
          <label className="mb-1 block text-xs text-zinc-700">Name *</label>
          <input
            required
            value={shipping.fullName}
            onChange={(e) => setShipping((prev) => ({ ...prev, fullName: e.target.value }))}
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-700">Door no *</label>
          <input
            required
            value={shipping.doorNo}
            onChange={(e) => setShipping((prev) => ({ ...prev, doorNo: e.target.value }))}
            placeholder="House number and street name"
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-700">Street Address *</label>
          <input
            required
            value={shipping.streetAddress}
            onChange={(e) => setShipping((prev) => ({ ...prev, streetAddress: e.target.value }))}
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-700">Town / City *</label>
          <input
            required
            value={shipping.city}
            onChange={(e) => setShipping((prev) => ({ ...prev, city: e.target.value }))}
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-700">State / County *</label>
          <select
            required
            value={shipping.state}
            onChange={(e) => setShipping((prev) => ({ ...prev, state: e.target.value }))}
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          >
            <option>Tamil Nadu</option>
            <option>Karnataka</option>
            <option>Kerala</option>
            <option>Andhra Pradesh</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-700">Postcode / ZIP *</label>
          <input
            required
            value={shipping.zip}
            onChange={(e) => setShipping((prev) => ({ ...prev, zip: e.target.value }))}
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-700">Phone *</label>
          <input
            required
            value={shipping.phone}
            onChange={(e) => setShipping((prev) => ({ ...prev, phone: e.target.value }))}
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-700">Alternative Mobile *</label>
          <input
            required
            value={shipping.altPhone}
            onChange={(e) => setShipping((prev) => ({ ...prev, altPhone: e.target.value }))}
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-700">Email address *</label>
          <input
            type="email"
            required
            value={shipping.email}
            onChange={(e) => setShipping((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-700">Country / Region *</label>
          <input
            required
            value={shipping.country}
            onChange={(e) => setShipping((prev) => ({ ...prev, country: e.target.value }))}
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-zinc-700">Payment Method *</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-zinc-300 px-3 py-2 text-sm"
          >
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI (Free Online Payment)</option>
          </select>
        </div>
        {paymentMethod === 'upi' && (
          <div className="rounded border border-violet-200 bg-violet-50 p-3 text-sm text-zinc-700">
            Place Order will open secure UPI popup payment.
          </div>
        )}
      </form>

      <aside className="h-fit rounded border border-zinc-200 bg-white p-4">
        <div className="mb-3 grid grid-cols-[1fr_auto] text-xs font-semibold uppercase text-zinc-700">
          <p>Product</p>
          <p>Subtotal</p>
        </div>
        <div className="space-y-2 border-b border-zinc-200 pb-3 text-sm">
          {items.map((item) => (
            <div key={item.product._id} className="flex justify-between">
              <span className="max-w-[220px] text-xs text-zinc-700">
                {item.product.name}
                <br />
                x {item.quantity}
              </span>
              <span className="text-rose-600">Rs {(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-2 border-b border-zinc-200 pb-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="text-rose-600">Rs {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>TN-Courier</span>
            <span className="text-rose-600">Rs {shippingCharge.toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-3 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-rose-600">Rs {total.toFixed(2)}</span>
        </div>
        <p className="mt-3 text-xs text-zinc-600">
          Your personal data will be used to process your order and support your experience.
        </p>
        <button
          type="submit"
          form="checkout-form"
          disabled={submitting || !items.length}
          className="mt-5 w-full rounded-full bg-rose-600 py-3 text-sm font-bold uppercase text-white disabled:opacity-50"
        >
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </aside>

      {showUpiModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4">
          <div className="grid w-full max-w-3xl overflow-hidden rounded-lg border-2 border-orange-400 bg-white md:grid-cols-[0.9fr_1.4fr]">
            <div className="bg-gradient-to-b from-orange-500 to-orange-700 p-4 text-white">
              <p className="text-sm font-semibold">Keerthi&apos;s</p>
              <div className="mt-4 rounded bg-white/90 p-3 text-zinc-800">
                <p className="text-xs font-semibold uppercase">Price Summary</p>
                <p className="mt-1 text-2xl font-bold">Rs {total.toFixed(0)}</p>
              </div>
              <p className="mt-3 rounded bg-white/90 px-3 py-2 text-xs text-zinc-800">
                Using UPI ID: {upiId}
              </p>
            </div>

            <div className="p-4">
              <div className="mb-4 flex items-center justify-between border-b border-zinc-200 pb-2">
                <p className="text-sm font-semibold">Payment Options</p>
                <button
                  type="button"
                  onClick={() => setShowUpiModal(false)}
                  className="text-zinc-500"
                >
                  ✕
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-[0.6fr_1fr]">
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-zinc-800">UPI</p>
                  <p className="text-zinc-500">Cards</p>
                  <p className="text-zinc-500">Netbanking</p>
                </div>
                <div className="rounded border border-zinc-200 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase text-zinc-600">UPI QR</p>
                  <img src={upiQrUrl} alt="UPI QR" className="h-44 w-44 rounded border border-zinc-200" />
                  <a href={upiLink} className="mt-2 inline-block text-sm text-accent underline">
                    Open UPI app
                  </a>
                  <input
                    value={upiTxnId}
                    onChange={(e) => setUpiTxnId(e.target.value)}
                    placeholder="Enter UPI transaction ID"
                    className="mt-3 w-full border border-zinc-300 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={completeUpiPayment}
                    disabled={submitting}
                    className="mt-3 w-full rounded-full bg-rose-600 py-2 text-sm font-bold uppercase text-white disabled:opacity-50"
                  >
                    {submitting ? 'Processing...' : 'Payment Done'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
