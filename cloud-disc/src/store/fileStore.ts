import { create } from "zustand";

interface file {
  id: string;
  name: string;
  type: string;
  size: string;
  createAt: string;
  updateAt: string;
  parent: string;
}

interface folder {
  type: "folder";
  id: string;
  name: string;
  size: string;
  createAt: string;
  updateAt: string;
  parent: string;
}

interface fileStore {
  files: (folder | file)[];
  addFile: (element: folder | file) => void;
  setFiles: (files: (folder | file)[]) => void;
}

export const useFileStore = create<fileStore>((set) => ({
  files: [],
  addFile: (element: folder | file) =>
    set((state) => ({
      files: [...state.files, element],
    })),
  setFiles: (newFiles: (folder | file)[]) => set({ files: newFiles }),
}));
