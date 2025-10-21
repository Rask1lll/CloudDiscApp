"use client";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { useEffect, useState } from "react";

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
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  useEffect(() => {
    setFileUrl("");
    setFileName("Загрузка...");
    setFileSize(null);
    setCreatedAt("");
    setIsAuthorized(true);

    const fetchVideo = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const accessToken = localStorage.getItem("access");

        if (!accessToken) {
          setIsAuthorized(false);
          setFileName("Видео недоступно");
          return;
        }

        const res = await fetch(
          `${API_URL}/storage/api/v3/files/${fileToken}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.status === 401 || res.status === 403) {
          setIsAuthorized(false);
          setFileName("Видео недоступно");
          return;
        }

        if (!res.ok) throw new Error("Ошибка при получении видео");

        const data = await res.json();

        setFileName(data.name);
        setFileUrl(data.download_url);
        setFileSize(data.size);
        setCreatedAt(new Date(data.created_at).toLocaleString());
      } catch (e) {
        console.error("Ошибка загрузки видео:", e);
        setFileName("Ошибка загрузки");
        setIsAuthorized(false);
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

  return (
    <div className="rounded-xl bg-white">
      <div className="border-b border-gray-300 px-2 gap-2 flex items-center py-5 pr-10">
        <HiOutlineVideoCamera className="w-5 h-5 text-orange-400" /> {fileName}
      </div>
      <div className="p-2 py-5 flex flex-col gap-3 items-center justify-center">
        {isAuthorized && fileUrl ? (
          <>
            <video
              key={fileUrl}
              controls
              className="rounded-lg lg:w-[600px] lg:h-[300px] sm:w-[400px] sm:h-[200px] bg-black"
            >
              <source src={fileUrl} type="video/mp4" />
              Ваш браузер не поддерживает видео.
            </video>
            <div className="text-sm text-gray-500">
              Размер: {formatSize(fileSize)}
            </div>
            <div className="text-sm text-gray-500">Загрузка: {createdAt}</div>
          </>
        ) : isAuthorized ? (
          <div className="text-gray-500">Загрузка видео...</div>
        ) : (
          <div className="flex items-center justify-center border-2 border-gray-300 rounded-lg lg:w-[600px] lg:h-[300px] sm:w-[400px] sm:h-[200px] text-gray-500">
            Видео доступно только авторизованным пользователям
          </div>
        )}
      </div>
    </div>
  );
}
