import { create } from "zustand";

interface user {
  status: string | null;
  setStatus: (t: string) => void;
}

export const useUserStore = create<user>((set) => ({
  status: "null",
  setStatus: (newStatus: string) => set({ status: newStatus }),
}));
