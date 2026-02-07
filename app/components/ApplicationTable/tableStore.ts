import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';

export const useTableStore = create<{
  tab: 'paid' | 'unPaid';
}>()(
  persist((set) => ({
    tab: 'paid',
  }), {
      name: "table-filters",
  }),
);
