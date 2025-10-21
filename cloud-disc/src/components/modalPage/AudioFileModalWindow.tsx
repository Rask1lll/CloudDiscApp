"use client";

import { AiOutlineAudio } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function AudioFileModalWindow({
  name,
  fileToken,
}: {
  fileToken: string;
  name: string;
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

    const fetchAudio = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const accessToken = localStorage.getItem("access");

        if (!accessToken) {
          setIsAuthorized(false);
          setFileName("Аудио недоступно");
          return;
        }

        const res = await fetch(
          `${API_URL}/storage/api/v3/files/${fileToken}/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (res.status === 401 || res.status === 403) {
          setIsAuthorized(false);
          setFileName("Аудио недоступно");
          return;
        }

        if (!res.ok) throw new Error("Ошибка при получении аудио");

        const data = await res.json();

        setFileName(data.name);
        setFileUrl(data.download_url);
        setFileSize(data.size);
        setCreatedAt(new Date(data.created_at).toLocaleString());
      } catch (e) {
        console.error("Ошибка загрузки аудио:", e);
        setFileName("Ошибка загрузки");
        setIsAuthorized(false);
      }
    };

    if (fileToken) fetchAudio();
  }, [fileToken]);

  const formatSize = (size: number | null) => {
    if (!size) return "";
    const mb = size / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="rounded-xl bg-white">
      <div className="border-b border-gray-300 px-2 gap-2 flex items-center py-5 pr-10">
        <AiOutlineAudio className="w-5 h-5 text-sky-400" /> {fileName}
      </div>

      <div className="p-4 flex flex-col gap-3 items-center justify-center">
        {isAuthorized && fileUrl ? (
          <>
            <audio key={fileUrl} src={fileUrl} controls className="w-80">
              Ваш браузер не поддерживает воспроизведение аудио
            </audio>
            <div className="text-sm text-gray-500">
              Размер: {formatSize(fileSize)}
            </div>
            <div className="text-sm text-gray-500">Загрузка: {createdAt}</div>
          </>
        ) : isAuthorized ? (
          <div className="text-gray-500">Загрузка аудио...</div>
        ) : (
          <div className="flex items-center justify-center border-2 border-gray-300 rounded-lg w-80 h-24 text-gray-500">
            Аудио доступно только авторизованным пользователям
          </div>
        )}
      </div>
    </div>
  );
}
