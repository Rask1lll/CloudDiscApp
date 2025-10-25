"use client";

import { AiOutlineAudio } from "react-icons/ai";
import { useEffect, useState } from "react";
import { BiQr } from "react-icons/bi";
import MakeQr from "../qr/MakeQr";
import { useUserStore } from "@/store/userStore";

export default function AudioFileModalWindow({
  fileToken,
}: {
  fileToken: string;
}) {
  const [fileName, setFileName] = useState<string>("Загрузка...");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [showQr, setShowQr] = useState<boolean>(false);
  const { status } = useUserStore();

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

  const formatSize = (size: number | null) => {
    if (!size) return "";
    const mb = size / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="rounded-xl bg-white pt-10">
      <div className="border-b border-gray-300 flex  py-3 p-4 ">
        <div className="w-[80%] flex gap-2 items-center">
          <AiOutlineAudio className="w-5 h-5 text-sky-400" /> {fileName}
        </div>
        {status && (
          <div className="w-[10%]">
            <div
              onClick={() => setShowQr(!showQr)}
              className="rounded-lg w-fit p-2 hover:bg-gray-100 transition cursor-pointer ring-1 ring-gray-300"
            >
              <BiQr className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3">
        {fileUrl ? (
          <>
            {showQr ? (
              <MakeQr
                link={`${process.env.NEXT_PUBLIC_PORT_URL}/file?link=${fileToken}&type=audio`}
              />
            ) : (
              <>
                <audio
                  key={fileUrl}
                  controlsList="nodownload"
                  src={fileUrl}
                  controls
                  className="w-80"
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                >
                  Ваш браузер не поддерживает воспроизведение аудио
                </audio>
                <div className="text-sm text-gray-500">
                  Размер: {formatSize(fileSize)}
                </div>
                <div className="text-sm text-gray-500">
                  Загрузка: {createdAt}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-gray-500">Загрузка аудио...</div>
        )}
      </div>
    </div>
  );
}
