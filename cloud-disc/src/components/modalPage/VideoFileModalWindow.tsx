"use client";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { useEffect, useState } from "react";
import MakeQr from "../qr/MakeQr";
import { BiQr } from "react-icons/bi";
import { useUserStore } from "@/store/userStore";
import MakeLink from "../qr/MakeLink";

export default function VideoFileModalWindow({
  name,
  fileToken,
}: {
  name: string;
  fileToken: string;
}) {
  const [fileName, setFileName] = useState<string>("Загрузка...");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [showQr, setShowQr] = useState<boolean>(false);

  useEffect(() => {
    setFileUrl("");
    setFileName("Загрузка...");
    setFileSize(null);
    setCreatedAt("");

    const fetchVideo = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(
          `${API_URL}/storage/api/v3/files/${fileToken}/`
        );

        if (!res.ok) throw new Error("Ошибка при получении видео");

        const data = await res.json();

        setFileName(data.name);
        setFileUrl(data.download_url);
        setFileSize(data.size);
        setCreatedAt(new Date(data.created_at).toLocaleString());
      } catch (e) {
        console.error("Ошибка загрузки видео:", e);
        setFileName("Ошибка загрузки");
      }
    };

    if (fileToken) {
      fetchVideo();
    }
  }, [fileToken]);

  const formatSize = (size: number | null) => {
    if (!size) return "";
    const mb = size / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };
  const { status } = useUserStore();

  return (
    <div className="rounded-2xl m-2 bg-white shadow-lg w-[calc(100dvw-40px)] ring-1 ring-gray-200 pt-8 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2 text-gray-800 font-medium truncate">
          <HiOutlineVideoCamera className="w-5 h-5 text-orange-500 shrink-0" />
          <span className="truncate">{fileName}</span>
        </div>
        {status && (
          <div className="flex gap-2">
            <div>
              <MakeLink
                link={`${process.env.NEXT_PUBLIC_PORT_URL}/file?link=${fileToken}&type=video`}
              />
            </div>

            <div
              onClick={() => setShowQr(!showQr)}
              className="rounded-lg p-2 hover:bg-gray-100 transition cursor-pointer ring-1 ring-gray-300"
            >
              <BiQr className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col items-center gap-4">
        {fileUrl ? (
          <>
            {showQr ? (
              <div className="flex flex-col items-center gap-2">
                <MakeQr
                  link={`${process.env.NEXT_PUBLIC_PORT_URL}/file?link=${fileToken}&type=video`}
                />
                <p className="text-sm text-gray-500 text-center">
                  Отсканируйте QR-код, чтобы открыть видео на телефоне
                </p>
              </div>
            ) : (
              <>
                <video
                  key={fileUrl}
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                  controls
                  controlsList="nodownload"
                  className="rounded-xl w-full max-w-[600px] not-md:max-w-[300px] not-sm:max-w-[200px] bg-black object-cover"
                >
                  <source src={fileUrl} type="video/mp4" />
                  <source src={fileUrl} type="video/quicktime" />
                  Ваш браузер не поддерживает видео.
                </video>

                <div className="flex flex-col sm:flex-row sm:justify-between w-full text-sm text-gray-500 mt-2">
                  <div>Размер: {formatSize(fileSize)}</div>
                  <div>Загрузка: {createdAt}</div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-gray-500 py-10">Загрузка видео...</div>
        )}
      </div>
    </div>
  );
}
