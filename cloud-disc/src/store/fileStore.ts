import { create } from "zustand";

interface file {
  id: string;
  name: string;
  type: string;
  size: string;
  createAt: Date;
  updateAt: Date;
  parent: string;
  token: string;
}

export interface folder {
  type: "folder";
  id: string;
  name: string;
  size: string;
  createAt: Date;
  updateAt: Date;
  parent: string | null;
  token: string;
}

interface fileStore {
  files: (folder | file)[];
  addFile: (element: folder | file) => void;
  setFiles: (files: (folder | file)[]) => void;
  addFileArray: (Files: (folder | file)[]) => void;
  sortFiles: (type: "alpInc" | "alpDec" | "dateInc" | "dateDec") => void;
  searchFiles: (name: string) => (folder | file)[];
  searchingQuery: string;
  setSearchingQuery: (s: string) => void;
  currentFolder: string;
  setCurrentFolder: (link: string) => void;
  currentFolderUUID: string;
  setCurrentFolderUUID: (link: string) => void;
  isPageFound: boolean;
  setIsPageFound: (b: boolean) => void;
}

const sort = function (
  arr: (folder | file)[],
  type: "alpInc" | "alpDec" | "dateInc" | "dateDec"
) {
  switch (type) {
    case "alpInc":
      return arr.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });

    case "alpDec":
      return arr.sort((a, b) => {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      });

    case "dateInc":
      return arr.sort((a, b) => {
        return a.createAt.getTime() - b.createAt.getTime();
      });

    case "dateDec":
      return arr.sort((a, b) => {
        return b.createAt.getTime() - a.createAt.getTime();
      });
  }
};

export const useFileStore = create<fileStore>((set, get) => ({
  isPageFound: true,
  setIsPageFound: (b: boolean) => set({ isPageFound: b }),
  currentFolder: "",
  setCurrentFolder: (link: string) => set({ currentFolder: link }),
  currentFolderUUID: "",
  setCurrentFolderUUID: (link: string) => set({ currentFolderUUID: link }),
  files: [],
  searchingQuery: "",
  setSearchingQuery: (s: string) => set({ searchingQuery: s }),
  addFile: (element: folder | file) =>
    set((state) => ({
      files: [...state.files, element],
    })),
  addFileArray: (Files: (folder | file)[]) =>
    set((state) => ({ files: [...state.files, ...Files] })),
  setFiles: (newFiles: (folder | file)[]) =>
    set({ files: sort(newFiles, "alpInc") }),
  sortFiles: (type: "alpInc" | "alpDec" | "dateInc" | "dateDec") =>
    set((state) => ({ files: sort(state.files, type) })),
  searchFiles: (query) => {
    if (!query) {
      return [];
    }
    const { files } = get();
    const q = query.toLowerCase().trim();
    return files.filter((file) => file.name.toLowerCase().includes(q));
  },
}));
