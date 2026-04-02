import { create } from "zustand";
import { transactions as mockData } from "../data/mockData";

// load from localStorage OR fallback to mock data
const savedTransactions =
  JSON.parse(localStorage.getItem("transactions")) || mockData;

export const useStore = create((set) => ({
  transactions: savedTransactions,
  role: "viewer",
  darkMode: false,

  setRole: (role) => set({ role }),

  toggleDarkMode: () =>
    set((state) => ({ darkMode: !state.darkMode })),

  addTransaction: (tx) =>
    set((state) => {
      const updated = [...state.transactions, tx];

      // 💾 save to localStorage
      localStorage.setItem("transactions", JSON.stringify(updated));

      return { transactions: updated };
    }),
}));