import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered'],
      default: 'pending'
    },
    shipping: {
      fullName: String,
      address: String,
      city: String,
      state: String,
      zip: String,
      phone: String,
      altPhone: String,
      email: String,
      country: String
    },
    paymentMethod: { type: String, default: 'cod' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    upiTransactionId: { type: String },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
