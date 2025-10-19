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

  const downloadFile = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const accessToken = localStorage.getItem("access");

      const res = await fetch(`${API_URL}/storage/api/v3/files/${token}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) throw new Error("Ошибка при получении файла");

      const data = await res.json();
      const url = data.download_url;

      // создаем ссылку для скачивания
      const link = document.createElement("a");
      link.href = url;
      link.download = data.name; // имя файла из API
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Ошибка при скачивании файла:", err);
      alert("Не удалось скачать файл");
    }
  };

  return (
    <div
      className="absolute top-[150%] bg-white ring-1 z-10 rounded-md ring-gray-300 right-0"
      onMouseEnter={() => setMouseInComponent(true)}
      onMouseLeave={() => setMouseInComponent(false)}
      ref={modalRef}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <ul className="decoration-0">
        <li
          onClick={downloadFile}
          className="flex hover:bg-gray-50 border-b border-b-gray-200 p-2 cursor-pointer"
        >
          <BiDownload className="h-4 w-4 box-content p-1 text-gray-600" />
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
          className="flex p-2 gap-1 hover:bg-gray-50 border-b border-b-gray-200 cursor-pointer"
        >
          <FaEdit className="h-4 w-4 box-content p-1 text-gray-600" />
          Переименовать
        </li>
        <li
          onClick={() => {
            setModalContent(
              <DeleteModalWindow fileName={fileName} fileId={fileId} />
            );
            unmount(false);
          }}
          className="flex hover:bg-gray-50 p-2 cursor-pointer"
        >
          <FaTrash className="h-4 w-4 box-content p-1 text-gray-600" />
          Удалить
        </li>
      </ul>
    </div>
  );
}
