declare module "pdfjs-dist/build/pdf";
declare module "pdfjs-dist/build/pdf.worker.min.mjs";

declare module "pdfjs-dist/webpack" {
  export const GlobalWorkerOptions: {
    workerSrc: any;
  };
  export function getDocument(src: any): any;
}
