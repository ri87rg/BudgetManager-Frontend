import { create } from "zustand";
import type { Budget } from "@/services/api";
import { getBudget, listBudgets } from "@/services/api";

interface BudgetState {
  budget: Budget | null;
  budgets: Budget[] | [] | null;
  loading: boolean;
  error: string | null;
  fetchBudget: (id: string) => Promise<void>;
  fetchAllBudgets: (page?: number, limit?: number) => Promise<void>;
  setBudget: (data: Budget | null) => void;
  clearBudget: () => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
  budget: null,
  budgets: [],
  loading: false,
  error: null,

  fetchBudget: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await getBudget(id);
      set({ budget: data });
    } catch (err: any) {
      set({ error: err.message || "Failed to load budget" });
    } finally {
      set({ loading: false });
    }
  },

  fetchAllBudgets: async (page = 1, limit = 1000) => {
    set({ loading: true, error: null });
    try {
      const res = await listBudgets(page, limit);
      set({ budgets: res.data });
    } catch (err: any) {
      set({ error: err.message || "Failed to load budgets" });
    } finally {
      set({ loading: false });
    }
  },

  setBudget: (data: Budget | null) => set({ budget: data }),

  clearBudget: () => set({ budget: null }),
}));
