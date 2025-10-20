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

  useEffect(() => {
    setFileUrl("");
    setFileName("Загрузка...");
    setFileSize(null);
    setCreatedAt("");

    const fetchAudio = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const accessToken = localStorage.getItem("access");

        const res = await fetch(
          `${API_URL}/storage/api/v3/files/${fileToken}/`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!res.ok) throw new Error("Ошибка при получении аудио");

        const data = await res.json();

        setFileName(data.name);
        setFileUrl(data.download_url);
        setFileSize(data.size);
        setCreatedAt(new Date(data.created_at).toLocaleString());
      } catch (e) {
        console.error("Ошибка загрузки аудио:", e);
        setFileName("Ошибка загрузки");
      }
    };

    if (fileToken) {
      fetchAudio();
    }
  }, [fileToken]);

  const formatSize = (size: number | null) => {
    if (!size) return "";
    const mb = size / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="rounded-xl bg-white">
      <div className="border-b border-gray-300 px-2 gap-2 flex items-center py-5">
        <AiOutlineAudio className="w-5 h-5 text-sky-400" /> {fileName}
      </div>

      <div className="p-4 flex flex-col gap-3">
        {fileUrl ? (
          <>
            <audio key={fileUrl} src={fileUrl} controls className="w-80">
              Ваш браузер не поддерживает воспроизведение аудио
            </audio>
            <div className="text-sm text-gray-500">
              Размер: {formatSize(fileSize)}
            </div>
            <div className="text-sm text-gray-500">Загрузка: {createdAt}</div>
          </>
        ) : (
          <div className="text-gray-500">Загрузка аудио...</div>
        )}
      </div>
    </div>
  );
}
