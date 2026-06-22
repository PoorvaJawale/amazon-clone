import { create } from "zustand";
import { toast } from "sonner";

export const useCartStore = create((set) => ({
  cart: [
    { id: "tumbler-1", name: "VENDERE Premium Stainless Steel Tumbler", price: 899, quantity: 1 },
    { id: "straw-1", name: "ANTIL'S Reusable Stainless Steel Straws", price: 349, quantity: 1 }
  ],
  address: {
    name: "Poorva",
    pincode: "401203",
    city: "Vasai Virar"
  },
  isRufusOpen: false,
  isAddressModalOpen: false,

  setRufusOpen: (val) => set({ isRufusOpen: val }),
  setAddressModalOpen: (val) => set({ isAddressModalOpen: val }),

  setAddress: (newAddress) => set({ address: newAddress }),

  addToCart: (item) => {
    set((state) => {
      const existing = state.cart.find((i) => i.id === item.id);
      let updatedCart;
      if (existing) {
        updatedCart = state.cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedCart = [...state.cart, { ...item, quantity: 1 }];
      }
      toast.success(`Added ${item.name} to cart!`, {
        description: `Price: ₹${item.price}`,
        duration: 3000,
        position: "top-right"
      });
      return { cart: updatedCart };
    });
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId)
    }));
  }
}));
