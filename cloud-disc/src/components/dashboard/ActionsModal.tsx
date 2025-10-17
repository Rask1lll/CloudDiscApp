"use client";
import { useModalStore } from "@/store/modalStore";
import { useEffect, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReNameModalDefault from "../modalPage/ReNameModalWindow";

export default function ActionsModal({
  unmount,
  fileName,
}: {
  unmount: (t: boolean) => void;
  fileName: string;
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
        e.stopPropagation();
      }}
    >
      <ul className="decoration-0">
        <li className="flex hover:bg-gray-50 border-b border-b-gray-200 p-2">
          <BiDownload className="h-4 w-4 box-content p-1 hover:cursor-pointer text-gray-600" />
          Скачать
        </li>
        <li
          onClick={() => {
            setModalContent(<ReNameModalDefault fileName={fileName} />);
            unmount(false);
          }}
          className="flex p-2 gap-1 hover:bg-gray-50 border-b border-b-gray-200"
        >
          <FaEdit className="h-4 w-4 box-content p-1  hover:cursor-pointer text-gray-600" />
          Переименовать{" "}
        </li>
        <li className="flex hover:bg-gray-50 p-2 ">
          <FaTrash className="h-4 w-4 box-content p-1 hover:cursor-pointer text-gray-600" />
          Удалить
        </li>
      </ul>
    </div>
  );
}
