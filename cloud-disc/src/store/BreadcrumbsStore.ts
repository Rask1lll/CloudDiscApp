import { create } from "zustand";

interface ViewPage {
  name: string;
  url: string;
}
interface Breadcrumbs {
  pages: ViewPage[];
  //   prevStates: [ViewPage[]];
  setPages: (page: ViewPage) => void;
}

export const useBreadcrumbsStore = create<Breadcrumbs>((set) => ({
  pages: [{ name: "Главнвя", url: "http://localhost:3000/dashboard" }],
  //   prevStates: [[]],
  //   addPrevState:()
  setPages: (page: ViewPage) => set((state) => ({ pages: [page] })),
}));
