import crypto from 'crypto';
import Order from '../models/Order.js';
import { getSocket } from '../config/socket.js';

const safeJsonParse = (input) => {
  try {
    return JSON.parse(input);
  } catch {
    return null;
  }
};

export const paymentWebhook = async (req, res, next) => {
  try {
    const secret = process.env.PAYMENT_WEBHOOK_SECRET;
    if (!secret) {
      return res.status(500).json({ message: 'Webhook secret not configured' });
    }

    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : '';
    const signature = req.headers['x-webhook-signature'];

    const expected = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (!signature || signature !== expected) {
      return res.status(401).json({ message: 'Invalid webhook signature' });
    }

    const payload = safeJsonParse(rawBody);
    if (!payload?.orderId || !payload?.paymentStatus) {
      return res.status(400).json({ message: 'Invalid webhook payload' });
    }

    const order = await Order.findById(payload.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.paymentStatus = payload.paymentStatus;
    if (payload.upiTransactionId) {
      order.upiTransactionId = payload.upiTransactionId;
    }
    await order.save();

    const io = getSocket();
    io.to(`user:${order.userId}`).emit('order:update', order);
    io.to('admin').emit('order:update', order);

    return res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    return next(error);
  }
};
