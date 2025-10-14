import { Content } from "next/font/google";
import { JSX } from "react";
import { create } from "zustand";

interface modal {
  modalContent: JSX.Element | null;
  setModalContent: (content: JSX.Element) => void;
  clearModalContent: () => void;
}

export const useModalStore = create<modal>((set) => ({
  modalContent: null,
  setModalContent: (content: JSX.Element) => set({ modalContent: content }),
  clearModalContent: () => set({ modalContent: null }),
}));
