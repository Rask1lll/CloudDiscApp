"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { BiQr } from "react-icons/bi";
import MakeQr from "../qr/MakeQr";
import { MdOutlineImage } from "react-icons/md";
import { useUserStore } from "@/store/userStore";
import MakeLink from "../qr/MakeLink";

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
  const [showQr, setShowQr] = useState<boolean>(false);

  useEffect(() => {
    async function getPhoto() {
      try {
        const token = localStorage.getItem("access");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/files/${fileToken}/`
        );

        if (!res.ok) {
          console.error(await res.text());
          return;
        }

        const imageRes = await res.json();

        setLink(imageRes.download_url);
        setDownloadUrl(imageRes.view_url);
      } catch (err) {
        console.error("Ошибка при получении изображения:", err);
      } finally {
        setIsLoading(false);
      }
    }
    getPhoto();
  }, []);

  const { status } = useUserStore();
  return (
    <div className="bg-white rounded-xl relative not-sm:w-[350px] max-w-[calc(100dvw-100px)] pt-10 h-full overflow-hidden">
      <div className="border-b flex border-gray-200 px-4">
        <h3 className="font-semibold p-2 flex text-xl text-gray-900 items-center gap-2 truncate pr-10">
          <div className="w-[40px]">
            <MdOutlineImage className="w-5 h-5 text-blue-500" />
          </div>
          <div className="w-[90%] overflow-ellipsis text-nowrap">{name}</div>
        </h3>
        <div className="w-min-[10%] ml-auto flex items-center">
          {status && (
            <div className="flex gap-2">
              <div>
                <MakeLink
                  link={`${process.env.NEXT_PUBLIC_PORT_URL}/file?link=${fileToken}&type=image`}
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
      </div>

      <div className="flex flex-col items-center justify-center p-4 md:p-8 gap-6 h-[calc(100%-80px)]">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <>
              {showQr ? (
                <MakeQr
                  link={`${process.env.NEXT_PUBLIC_PORT_URL}/file?link=${fileToken}&type=image`}
                />
              ) : (
                <div
                  className="relative group w-full flex justify-center cursor-zoom-in"
                  onClick={() => setIsZoomed(true)}
                >
                  <Image
                    onContextMenu={(e) => {
                      e.preventDefault();
                    }}
                    src={link || "/image.jpeg"}
                    alt={name}
                    width={600}
                    height={600}
                    unoptimized
                    className="max-h-[70vh] object-contain rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
            </>
          </>
        )}
      </div>

      {isZoomed && (
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
