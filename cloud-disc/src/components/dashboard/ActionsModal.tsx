"use client";
import { useEffect, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ActionsModal({
  unmount,
}: {
  unmount: (t: boolean) => void;
}) {
  const [mouseInComponent, setMouseInComponent] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mouseInComponent) {
        unmount(false);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [mouseInComponent]);
  return (
    <div
      className="absolute top-[150%] bg-white ring-1 z-20 rounded-md ring-gray-300 right-0"
      onMouseEnter={() => {
        setMouseInComponent(true);
      }}
      onMouseLeave={() => {
        setMouseInComponent(false);
      }}
    >
      <ul className="decoration-0">
        <li className="flex hover:bg-gray-50 border-b border-b-gray-200 p-2">
          <BiDownload className="h-4 w-4 box-content p-1 hover:cursor-pointer text-gray-600" />
          Скачать
        </li>
        <li className="flex p-2 gap-1 hover:bg-gray-50 border-b border-b-gray-200">
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
