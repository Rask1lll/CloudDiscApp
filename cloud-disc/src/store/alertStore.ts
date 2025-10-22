import { create } from "zustand";

interface AlertState {
  alert: { alert: string; color: string };
  setAlert: ({ label, color }: { label: string; color: string }) => void;
  clearAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alert: { alert: "", color: "red" },
  setAlert: ({ label, color }) => set({ alert: { alert: label, color } }),
  clearAlert: () => set({ alert: { alert: "", color: "red" } }),
}));
