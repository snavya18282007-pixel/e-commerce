import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const createOrderSchema = z.object({
  userId: z.string().regex(objectIdRegex, 'Invalid user id'),
  items: z
    .array(
      z.object({
        productId: z.string().regex(objectIdRegex, 'Invalid product id'),
        quantity: z.number().int().min(1)
      })
    )
    .min(1, 'At least one order item is required'),
  totalPrice: z.number().positive(),
  paymentMethod: z.enum(['cod', 'upi']),
  upiTransactionId: z.string().trim().optional(),
  shipping: z.object({
    fullName: z.string().min(2),
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2).optional(),
    zip: z.string().min(3),
    phone: z.string().min(8).optional(),
    altPhone: z.string().min(8).optional(),
    email: z.string().email().optional(),
    country: z.string().min(2).optional()
  })
});

export const updatePaymentStatusSchema = z.object({
  status: z.enum(['pending', 'paid', 'failed']),
  upiTransactionId: z.string().trim().optional()
});
