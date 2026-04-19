import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: {
    _id: 'demo-user-id',
    name: 'Demo Customer',
    role: 'customer'
  },
  setUser: (user) => set({ user })
}));
