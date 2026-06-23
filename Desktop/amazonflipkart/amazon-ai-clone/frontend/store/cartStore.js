"use client";
import { create } from "zustand";
import { toast } from "sonner";

export const useCartStore = create((set, get) => ({
  items: [],
  count: 0,

  addItem: (product) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      const items = existing
        ? state.items.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.items, { ...product, qty: 1 }];
      const count = items.reduce((s, i) => s + i.qty, 0);
      toast.success(`Added to Cart`, { description: product.name, duration: 2000 });
      return { items, count };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const items = state.items.filter((i) => i.id !== id);
      return { items, count: items.reduce((s, i) => s + i.qty, 0) };
    });
  },

  updateQty: (id, qty) => {
    set((state) => {
      const items = qty <= 0
        ? state.items.filter((i) => i.id !== id)
        : state.items.map((i) => i.id === id ? { ...i, qty } : i);
      return { items, count: items.reduce((s, i) => s + i.qty, 0) };
    });
  },

  clear: () => set({ items: [], count: 0 }),
}));
