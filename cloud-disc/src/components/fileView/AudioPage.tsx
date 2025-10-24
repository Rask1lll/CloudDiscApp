"use client";

import { AiOutlineAudio } from "react-icons/ai";
import { useEffect, useState } from "react";
import { BiQr } from "react-icons/bi";
import MakeQr from "../qr/MakeQr";

export default function AudioPage({ fileToken }: { fileToken: string }) {
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

    const fetchAudio = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(
          `${API_URL}/storage/api/v3/files/${fileToken}/`
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

  return (
    <div className="w-dvw h-dvh bg-blue-100 flex justify-center items-center ">
      <div className="rounded-xl bg-white py-10 w-[30%] min-w-[320px]">
        <div className="border-b border-gray-300 flex  p-3 ">
          <div className="w-[80%] flex gap-2">
            <AiOutlineAudio className="w-5 h-5 text-sky-400" /> {fileName}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-3">
          {fileUrl ? (
            <>
              {
                <>
                  <audio
                    key={fileUrl}
                    controlsList="nodownload"
                    src={fileUrl}
                    controls
                    className="w-80 not-sm:w-72"
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Ваш браузер не поддерживает воспроизведение аудио
                  </audio>
                </>
              }
            </>
          ) : (
            <div className="text-gray-500">Загрузка аудио...</div>
          )}
        </div>
      </div>
    </div>
  );
}
