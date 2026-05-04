import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  getHomeData
} from '../controllers/productController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getProducts);
router.get('/homeData', getHomeData);
router.get('/:id', getProductById);
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;
