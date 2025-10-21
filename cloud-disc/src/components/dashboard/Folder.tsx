"use client";
import { AiOutlineFolder } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import FolderActionsModal from "./FolderActionsModal";

export default function Folder({
  fileId,
  type,
  name,
  createDate,
  fileToken,
}: any) {
  const { status } = useUserStore();
  const [actionsOpen, setActionsOpen] = useState(false);

  return (
    <Link href={`/folder?uuid=${encodeURIComponent(fileToken)}`}>
      <div
        className={`grid items-center border-b border-gray-100 hover:bg-gray-50 transition-all px-5 py-3 cursor-pointer 
        ${
          status
            ? "grid-cols-[40px_2fr_1fr_1fr_1fr_100px] not-md:grid-cols-[40px_7fr_1fr_10px]"
            : "grid-cols-[40px_2fr_1fr_1fr_1fr] not-md:grid-cols-[40px_1fr_10px]"
        }`}
      >
        <div>
          <AiOutlineFolder className="h-5 w-5 text-yellow-500" />
        </div>

        <div className="truncate text-gray-900 font-medium flex flex-col">
          <span>{name}</span>
          <div className="flex md:hidden text-sm text-gray-500 gap-2 mt-1">
            <span>{new Date(createDate).toLocaleDateString("ru-RU")}</span>
          </div>
        </div>

        <div className="hidden md:block text-gray-500">{type}</div>

        <div className="hidden md:block text-gray-500">---</div>

        <div className="hidden md:block text-gray-500">
          {new Date(createDate).toLocaleDateString("ru-RU")}
        </div>

        {status && (
          <div className="relative flex justify-end md:justify-end md:pr-5">
            <BsThreeDots
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActionsOpen(!actionsOpen);
              }}
              className="
        cursor-pointer text-gray-700
        absolute right-2 top-1/2 -translate-y-1/2
        md:static md:translate-y-0
      "
            />
            {actionsOpen && (
              <FolderActionsModal
                fileId={fileId}
                token={fileToken}
                fileName={name}
                unmount={setActionsOpen}
              />
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
