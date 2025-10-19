import { create } from "zustand";

interface user {
  status: string | null;
  setStatus: (t: string | null) => void;
}

export const useUserStore = create<user>((set) => ({
  status: null,
  setStatus: (newStatus: string | null) => set({ status: newStatus }),
}));
