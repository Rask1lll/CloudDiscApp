"use client";
import { useState } from "react";
import { AiOutlineFolder } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import FolderActionsModal from "./FolderActionsModal";
export default function Folder({
  fileId,
  type,
  name,
  createDate,
  updateAt,
  fileToken,
}: {
  fileId: string;
  type: string;
  name: string;
  createDate: Date;
  updateAt: Date;
  fileToken: string;
}) {
  const [actionsOpen, setActionsOpen] = useState<Boolean>(false);
  const { status } = useUserStore();

  return (
    <Link href={`/folder?uuid=${encodeURIComponent(fileToken)}`}>
      <div className=" w-full hover:cursor-pointer hover:bg-gray-50 p-4 border-b border-gray-100 transition-all duration-500  flex items-center justify-between gap-3 ">
        <div className="flex gap-2 items-center w-[40%] not-md:w-[100%] whitespace-nowrap">
          <div className="w-[5%]">
            {<AiOutlineFolder className="h-5  w-5" />}{" "}
          </div>
          <h3 className="font-medium text-gray-900 overflow-ellipsis  line-clamp-1 md:line-clamp-2 w-[95%]">
            {name}
            <div className="flex gap-2 text-sm md:hidden text-gray-500">
              <span>{createDate.toLocaleDateString("ru-RU")}</span>
            </div>
          </h3>
        </div>
        <div
          className={`md:w-[60%] text-base  ${
            !status ? "mr-14" : "md:ml-28"
          } flex justify-between`}
        >
          <div
            className={`flex w-[10%] gap-2 ${
              !status ? "mx-auto" : "mr-8"
            } text-gray-500 not-md:hidden`}
          >
            <span>{type}</span>
          </div>
          <div
            className={`flex not-md:hidden w-[60%] ${
              status && "w-[%]"
            } gap-20  text-gray-500`}
          >
            <span className={`w-[60px] not-md:hidden`}>{"---"}</span>
            <span className="not-md:hidden">
              {createDate.toLocaleDateString("ru-RU")}
            </span>
            {/* <span className="">{updateAt.toLocaleDateString("ru-RU")}</span> */}
          </div>
          {status && (
            <div className="flex gap-2 items-center relative ">
              <BsThreeDots
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActionsOpen(!actionsOpen);
                }}
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
      </div>
    </Link>
  );
}
