"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";

export default function ImageFileModalWindow({
  name,
  fileToken,
}: {
  name: string;
  fileToken: string;
}) {
  const [link, setLink] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = useState<string>();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);

  useEffect(() => {
    async function getPhoto() {
      try {
        const token = localStorage.getItem("access");

        if (!token) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/files/${fileToken}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401 || res.status === 403) {
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        if (!res.ok) {
          console.error(await res.text());
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }

        const imageRes = await res.json();

        setLink(imageRes.download_url);
        setDownloadUrl(imageRes.view_url);
        setIsAuthorized(true);
      } catch (err) {
        console.error("Ошибка при получении изображения:", err);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    }
    getPhoto();
  }, [fileToken]);

  const handleDownload = async () => {
    if (!downloadUrl) return;
    try {
      const res = await fetch(downloadUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Ошибка при скачивании файла:", err);
    }
  };

  return (
    <div className="bg-white rounded-xl relative w-full h-full overflow-hidden">
      <div className="border-b border-gray-200">
        <h3 className="font-semibold p-2 text-xl text-gray-900 truncate pr-10">
          {name}
        </h3>
      </div>

      <div className="flex flex-col items-center justify-center p-4 md:p-8 gap-6 h-[calc(100%-80px)]">
        {isLoading ? (
          <Loading />
        ) : isAuthorized && link ? (
          <>
            <div
              className="relative group w-full flex justify-center cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              <Image
                src={link || "/image.jpeg"}
                alt={name}
                width={600}
                height={600}
                unoptimized
                className="max-h-[70vh] object-contain rounded-lg transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* <div className="flex justify-center">
              <button
                onClick={handleDownload}
                className="bg-gray-100 ring ring-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors"
              >
                Скачать
              </button>
            </div> */}
          </>
        ) : (
          <div className="flex items-center justify-center border-2 border-gray-300 rounded-lg w-full max-w-[600px] h-[400px] text-gray-500">
            Изображение доступно только авторизованным пользователям
          </div>
        )}
      </div>

      {isZoomed && isAuthorized && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-zoom-out p-4"
          onClick={() => setIsZoomed(false)}
        >
          <Image
            src={link || "/image.jpeg"}
            alt={name}
            fill
            unoptimized
            className="object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
