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
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/storage/api/v3/files/${fileToken}/`
        );
        const data = await res.json();
        setLink(data.download_url);
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getDocument();
  }, [fileToken]);
  return (
    <div className="p-1 w-[50vw] not-sm:w-[80vw]">
      <div className="bg-gray-100 p-2 rounded-xl border-b-2 w-full max-w-3xl mx-auto overflow-hidden shadow-lg">
        <p className="max-w-[80%] overflow-ellipsis line-clamp-2">{name}</p>
        {isLoading ? (
          <div className="flex items-center justify-center h-[70vh]">
            <Loading />
          </div>
        ) : (
          <div className="relative w-full">
            <iframe
              title="pdf file opened by user"
              src={`${link}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-[70vh] sm:h-[75vh] md:h-[80vh]"
              style={{
                border: "none",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
