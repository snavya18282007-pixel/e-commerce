import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { initSocket } from './config/socket.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { buildAdminRouter } from './admin/adminPanel.js';

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

connectDB();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300
  })
);

// Keep webhook payload raw for signature verification.
app.use('/api/payments', express.raw({ type: 'application/json' }), paymentRoutes);
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

const startServer = async () => {
  const adminRouter = await buildAdminRouter();
  app.use('/admin', adminRouter);

  app.use(notFound);
  app.use(errorHandler);

  const port = process.env.PORT || 5000;
  initSocket(httpServer);

  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
