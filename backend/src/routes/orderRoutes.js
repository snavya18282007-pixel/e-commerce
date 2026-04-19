import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrderPaymentStatus
} from '../controllers/orderController.js';
import { authorize, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  createOrderSchema,
  updatePaymentStatusSchema
} from '../validators/orderValidators.js';

const router = Router();

router.post('/', validate(createOrderSchema), createOrder);
router.get('/', protect, authorize('admin'), getAllOrders);
router.get('/user/:userId', getOrdersByUser);
router.patch(
  '/:id/payment-status',
  protect,
  authorize('admin'),
  validate(updatePaymentStatusSchema),
  updateOrderPaymentStatus
);

export default router;
