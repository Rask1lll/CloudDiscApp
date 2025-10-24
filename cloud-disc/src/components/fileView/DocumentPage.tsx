"use client";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { BiQr } from "react-icons/bi";
import MakeQr from "../qr/MakeQr";

export default function DocumentPage({ fileToken }: { fileToken: string }) {
  const [fileName, setFileName] = useState<string>("Загрузка...");
  const [link, setLink] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [showQr, setShowQr] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/files/${fileToken}/`
        );
        const data = await res.json();
        setLink(`${data.download_url}#toolbar=0&navpanes=0&scrollbar=0`);
        setFileName(data.name);
      } catch (e) {
        console.error("Error fetching document:", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fileToken]);

  return (
    <div className="w-dvw h-dvh bg-blue-100 flex justify-center items-center">
      <div
        className="p-1 w-[50vw] max-sm:w-[80vw]"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="bg-gray-100 pt-10 p-2 rounded-xl border-b-2 w-full max-w-3xl mx-auto overflow-hidden shadow-lg">
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="max-w-[70%] overflow-ellipsis line-clamp-2">
              {fileName}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 rounded border"
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                title="Уменьшить"
              >
                −
              </button>
              <span className="min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                className="px-2 py-1 rounded border"
                onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                title="Увеличить"
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
            link && (
              <div className="overflow-hidden w-full h-[70vh] sm:h-[75vh] md:h-[80vh] rounded-lg bg-[#f8f8f8] flex justify-center">
                <iframe
                  key={link}
                  src={link}
                  title={fileName}
                  className="w-full h-full"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "center top",
                    border: "none",
                  }}
                  sandbox="allow-same-origin allow-scripts"
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
