"use client";
import { useModalStore } from "@/store/modalStore";
import { useEffect, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReNameModalDefault from "../modalPage/ReNameModalWindow";
import DeleteModalWindow from "../modalPage/DeleteModalWindow";
import ReNameFolderModalWindow from "../modalPage/ReNameFolderModalWindow";
import DeleteFolderModalWindow from "../modalPage/DeleteFolderModalWindow";

export default function FolderActionsModal({
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
      if (!mouseInComponent) {
        unmount(false);
      }
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
  return (
    <div
      className="absolute top-[150%] bg-white ring-1 z-10 rounded-md ring-gray-300 right-0"
      onMouseEnter={() => {
        setMouseInComponent(true);
      }}
      onMouseLeave={() => {
        setMouseInComponent(false);
      }}
      ref={modalRef}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <ul className="decoration-0">
        <li
          onClick={() => {
            setModalContent(
              <ReNameFolderModalWindow
                fileName={fileName}
                fileToken={token}
                fileId={fileId}
              />
            );
            unmount(false);
          }}
          className="flex p-2 gap-1 hover:bg-gray-50 border-b border-b-gray-200"
        >
          <FaEdit className="h-4 w-4 box-content p-1  hover:cursor-pointer text-gray-600" />
          Переименовать{" "}
        </li>
        <li
          onClick={() => {
            setModalContent(
              <DeleteFolderModalWindow fileName={fileName} fileId={fileId} />
            );
            unmount(false);
          }}
          className="flex hover:bg-gray-50 p-2 "
        >
          <FaTrash className="h-4 w-4 box-content p-1 hover:cursor-pointer text-gray-600" />
          Удалить
        </li>
      </ul>
    </div>
  );
}
