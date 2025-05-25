import { create } from 'zustand';
import { persist } from 'zustand/middleware'

// Zustand store for managing orders in the restaurant dashboard
const useOrderStore = create(persist((set) => ({
  // Array to hold the list of orders
  orders: [],
  tax: 2.0,
  // Function to add a new order to the list
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),

  // Function to remove an order by its ID
  removeOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== orderId),
    })),

  // Function to clear all orders
  clearOrders: () => set({ orders: [] }),

  // Function to increase the quantity of an order by its ID
  increaseQuantity: (orderId) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, quantity: (order.quantity || 1) + 1 }
          : order
      ),
    })),

  // Function to decrease the quantity of an order by its ID, ensuring it doesn't go below 1
  decreaseQuantity: (orderId) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId && order.quantity > 1
          ? { ...order, quantity: order.quantity - 1 }
          : order
      ),
    })),
})),
  {
    name: 'my-zustand-store',
  }
);

export default useOrderStore;