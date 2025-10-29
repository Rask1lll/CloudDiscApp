"use client";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { BiQr } from "react-icons/bi";
import MakeQr from "../qr/MakeQr";
import { useUserStore } from "@/store/userStore";
import MakeLink from "../qr/MakeLink";

export default function DocumentModalWindow({
  name,
  fileToken,
}: {
  name: string;
  fileToken: string;
}) {
  const [pages, setPages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showQr, setShowQr] = useState(false);
  const { status } = useUserStore();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/files_preview/${fileToken}/`
        );
        const data = await res.json();
        if (data.view_urls && Array.isArray(data.view_urls)) {
          setPages(data.view_urls);
        } else {
          console.error("No view_urls found in response");
        }
      } catch (e) {
        console.error("Error fetching document:", e);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [fileToken]);

  return (
    <div
      className="p-1 w-[50vw] max-sm:w-[80vw]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="bg-gray-100 pt-10 p-2 rounded-xl border-b-2 w-full max-w-3xl mx-auto overflow-hidden shadow-lg">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="max-w-[70%] overflow-ellipsis line-clamp-2">{name}</p>
          {status && (
            <div className="flex gap-2">
              <div>
                <MakeLink
                  link={`${process.env.NEXT_PUBLIC_PORT_URL}/file?link=${fileToken}&type=document`}
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

        {isLoading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <Loading />
          </div>
        ) : showQr ? (
          <MakeQr
            link={`${process.env.NEXT_PUBLIC_PORT_URL}/file?link=${fileToken}&type=document`}
          />
        ) : (
          <div className="overflow-y-auto w-full h-[70vh] sm:h-[75vh] md:h-[80vh] rounded-lg bg-[#f8f8f8] p-2 flex flex-col items-center gap-4">
            {pages.length > 0 ? (
              pages.map((url, index) => (
                <img
                  onContextMenu={(e) => {
                    e.preventDefault();
                  }}
                  key={index}
                  src={url}
                  alt={`Page ${index + 1}`}
                  className="rounded-lg border border-gray-300 shadow"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              ))
            ) : (
              <p>Нет данных для отображения</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
