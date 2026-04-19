import Order from '../models/Order.js';
import { getSocket } from '../config/socket.js';

export const createOrder = async (req, res, next) => {
  try {
    const orderPayload = {
      ...req.body,
      paymentStatus:
        req.body.paymentMethod === 'upi' && req.body.upiTransactionId ? 'paid' : 'pending'
    };
    const order = await Order.create(orderPayload);
    const io = getSocket();
    io.to(`user:${order.userId}`).emit('order:update', order);
    io.to('admin').emit('order:new', order);
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort('-createdAt');
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

export const getOrdersByUser = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort('-createdAt');
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

export const updateOrderPaymentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.paymentStatus = status || order.paymentStatus;
    if (req.body.upiTransactionId) {
      order.upiTransactionId = req.body.upiTransactionId;
    }
    await order.save();

    const io = getSocket();
    io.to(`user:${order.userId}`).emit('order:update', order);
    io.to('admin').emit('order:update', order);

    return res.status(200).json({ message: 'Payment status updated', order });
  } catch (error) {
    return next(error);
  }
};
