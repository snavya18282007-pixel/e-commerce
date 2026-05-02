import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
    shippingAddress: {
      doorNo: { type: String, default: '' },
      streetAddress: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: 'Tamil Nadu' },
      zip: { type: String, default: '' },
      phone: { type: String, default: '' },
      altPhone: { type: String, default: '' },
      country: { type: String, default: 'India' }
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
