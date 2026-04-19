import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  addToCart: (product, quantity = 1) => {
    const current = get().items;
    const existing = current.find((item) => item.product._id === product._id);

    if (existing) {
      set({
        items: current.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
      return;
    }

    set({ items: [...current, { product, quantity }] });
  },
  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return;
    set({
      items: get().items.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    });
  },
  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.product._id !== productId) });
  },
  clearCart: () => set({ items: [] }),
  cartCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: () =>
    get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}));
