"use client";
import { useModalStore } from "@/store/modalStore";
import { useEffect, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReNameModalDefault from "../modalPage/ReNameModalWindow";
import DeleteModalWindow from "../modalPage/DeleteModalWindow";

export default function ActionsModal({
  unmount,
  fileName,
  token,
  fileId,
}: {
  unmount: (t: boolean) => void;
  fileName: string;
  token: string;
  fileId: string;
}) {
  const { setModalContent } = useModalStore();
  const [mouseInComponent, setMouseInComponent] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mouseInComponent) unmount(false);
    }, 5000);

    function handleClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        unmount(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [mouseInComponent]);

  const handleDownload = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const accessToken = localStorage.getItem("access");

      const res = await fetch(`${API_URL}/storage/api/v3/files/${token}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка при получении информации о файле");

      const data = await res.json();
      const fileUrl = data.download_url;
      const fileNameFromApi = data.name || fileName;

      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileNameFromApi;
      a.target = "_blank";
      document.body.appendChild(a);

      a.click();
      a.remove();
    } catch (err) {
      console.error("Ошибка при скачивании файла:", err);
    }
  };

  return (
    <div
      className="absolute top-[150%] bg-white ring-1 z-10 rounded-md ring-gray-300 right-0 shadow-md"
      onMouseEnter={() => setMouseInComponent(true)}
      onMouseLeave={() => setMouseInComponent(false)}
      ref={modalRef}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <ul className="decoration-0 min-w-[160px]">
        <li
          onClick={handleDownload}
          className="flex items-center gap-2 hover:bg-gray-50 border-b border-b-gray-200 p-2 cursor-pointer"
        >
          <BiDownload className="h-4 w-4 text-gray-600" />
          Скачать
        </li>
        <li
          onClick={() => {
            setModalContent(
              <ReNameModalDefault
                fileName={fileName}
                fileToken={token}
                fileId={fileId}
              />
            );
            unmount(false);
          }}
          className="flex items-center gap-2 p-2 hover:bg-gray-50 border-b border-b-gray-200 cursor-pointer"
        >
          <FaEdit className="h-4 w-4 text-gray-600" />
          Переименовать
        </li>
        <li
          onClick={() => {
            setModalContent(
              <DeleteModalWindow fileName={fileName} fileId={fileId} />
            );
            unmount(false);
          }}
          className="flex items-center gap-2 hover:bg-gray-50 p-2 cursor-pointer"
        >
          <FaTrash className="h-4 w-4 text-gray-600" />
          Удалить
        </li>
      </ul>
    </div>
  );
}
