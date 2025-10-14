import { create } from "zustand";

interface alert {
  alert: string;
  setAlert: (label: string) => void;
  clearAlert: () => void;
}

export const useAlertStore = create<alert>((set) => ({
  alert: "",
  setAlert: (label: string) => set({ alert: label }),
  clearAlert: () => set({ alert: "" }),
}));
