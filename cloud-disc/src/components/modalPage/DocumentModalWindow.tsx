"use client";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";

export default function DocumentModalWindow({
  name,
  fileToken,
}: {
  name: string;
  fileToken: string;
}) {
  const [link, setLink] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function getDocument() {
      const token = localStorage.getItem("access");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/files/${fileToken}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();

      const fileRes = await fetch(data.download_url);
      const blob = await fileRes.blob();
      const url = URL.createObjectURL(blob);

      setLink(url);
      setIsLoading(false);
    }
    getDocument();
  }, [fileToken]);

  return (
    <div className="bg-white rounded-xl  h-full">
      <div className="border-b border-gray-200">
        <h3 className="font-semibold p-2 text-xl  text-gray-900 mb-2">
          {name}
        </h3>
      </div>
      <div className=" flex p-5 flex-col items-center justify-center h-full space-y-6">
        {isLoading ? (
          <Loading />
        ) : (
          <embed
            src={link}
            type="application/pdf"
            className="not-sm:w-[900px] not-sm:h-[100%]"
          />
        )}
        <div className="text-center">
          <div className="space-y-3">
            <div className="flex space-x-3 justify-center">
              <button className="bg-gray-100 ring ring-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                Скачать
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
