"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Loading from "../loading/Loading";
import { BiQr } from "react-icons/bi";
import MakeQr from "../qr/MakeQr";

export default function DocumentModalWindow({
  name,
  fileToken,
}: {
  name: string;
  fileToken: string;
}) {
  const [link, setLink] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [showQr, setShowQr] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const renderInProgress = useRef(false);
  const pdfjsRef = useRef<any>(null);

  // Загружаем pdf.js (через webpack — воркер автоматически подключается)
  useEffect(() => {
    (async () => {
      const pdfjsLib = await import("pdfjs-dist/webpack");
      pdfjsRef.current = pdfjsLib;
    })();
  }, []);

  // Получаем ссылку на файл
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/files/${fileToken}/`
        );
        const data = await res.json();
        setLink(data.download_url);
      } catch (e) {
        console.error("Error fetching document:", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fileToken]);

  // Функция рендера PDF
  const renderPdf = useCallback(
    async (url: string) => {
      const pdfjsLib = pdfjsRef.current;
      if (!pdfjsLib) return;
      const host = containerRef.current;
      if (!host || renderInProgress.current) return;

      renderInProgress.current = true;
      host.innerHTML = "";

      try {
        const pdf = await pdfjsLib.getDocument(url).promise;
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        const containerWidth = host.clientWidth || 800;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const baseViewport = page.getViewport({ scale: 1 });
          const cssScale = (containerWidth / baseViewport.width) * zoom;
          const viewport = page.getViewport({ scale: cssScale });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d", { alpha: false })!;
          canvas.width = Math.round(viewport.width * dpr);
          canvas.height = Math.round(viewport.height * dpr);
          canvas.style.width = `${Math.round(viewport.width)}px`;
          canvas.style.height = `${Math.round(viewport.height)}px`;
          canvas.style.display = "block";
          canvas.style.marginBottom = "12px";
          canvas.style.background = "#fff";

          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          await page.render({ canvasContext: ctx, viewport }).promise;
          host.appendChild(canvas);
        }
      } catch (err) {
        console.error("Ошибка рендера PDF:", err);
      } finally {
        renderInProgress.current = false;
      }
    },
    [zoom]
  );

  // Ререндер при изменении зума или ссылки
  useEffect(() => {
    if (link && pdfjsRef.current) renderPdf(link);
  }, [link, zoom, renderPdf]);

  return (
    <div
      className="p-1 w-[50vw] max-sm:w-[80vw]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="bg-gray-100 pt-10 p-2 rounded-xl border-b-2 w-full max-w-3xl mx-auto overflow-hidden shadow-lg">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="max-w-[70%] overflow-ellipsis line-clamp-2">{name}</p>
          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 rounded border"
              onClick={() => setZoom((z) => Math.max(0.5, z / 1.1))}
            >
              −
            </button>
            <span className="min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              className="px-2 py-1 rounded border"
              onClick={() => setZoom((z) => Math.min(5, z * 1.1))}
            >
              +
            </button>
            <BiQr
              onClick={() => setShowQr(!showQr)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <Loading />
          </div>
        ) : showQr ? (
          <MakeQr
            link={`${process.env.NEXT_PUBLIC_PORT_URL}/file?link=${fileToken}&type=document`}
          />
        ) : (
          <div
            ref={containerRef}
            className="overflow-auto w-full h-[70vh] sm:h-[75vh] md:h-[80vh] rounded-lg"
            style={{ background: "#f8f8f8", padding: 12 }}
          />
        )}
      </div>
    </div>
  );
}
