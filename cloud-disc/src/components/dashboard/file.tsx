"use client";
import { JSXElementConstructor, useState } from "react";
import { AiOutlineAudio } from "react-icons/ai";
import { BiDownload } from "react-icons/bi";
import { BsOption, BsThreeDots } from "react-icons/bs";
import { FaEdit, FaFolder, FaTrash } from "react-icons/fa";
import { GrTreeOption } from "react-icons/gr";
import { HiOutlineDocument, HiOutlineVideoCamera } from "react-icons/hi";
import ActionsModal from "./ActionsModal";
export default function File({
  type,
  name,
  createDate,
  size,
}: {
  type: string;
  name: string;
  createDate: string;
  size: string;
}) {
  const [actionsOpen, setActionsOpen] = useState<Boolean>(false);
  const IconType = () => {
    switch (type) {
      case "file":
        return <HiOutlineDocument className="h-5 text-green-600 w-5" />;
      case "video":
        return <HiOutlineVideoCamera className="h-5 text-orange-400 w-5" />;
      case "audio":
        return <AiOutlineAudio className="h-5 text-sky-600 w-5" />;
      case "folder":
        return <FaFolder className="h-5  w-5" />;
      default:
        return <HiOutlineDocument className="h-5 w-5" />;
    }
  };

  return (
    <div className=" w-full hover:cursor-pointer hover:bg-gray-50 p-4 not-last:border-b border-gray-100 transition-all duration-500  flex items-center justify-between gap-3 ">
      <div className="flex gap-2 items-center w-[50%] whitespace-nowrap">
        {IconType()}{" "}
        <h3 className="font-medium text-gray-900 overflow-ellipsis  line-clamp-1 md:line-clamp-2 max-w-[70%]">
          {name}
          <div className="flex gap-2 text-sm md:hidden text-gray-500">
            <span>{size}</span>
            <span>{createDate}</span>
          </div>
        </h3>
      </div>
      <div className="flex gap-2 text-base not-md:hidden text-gray-500">
        <span>{size}</span>|<span>{createDate}</span>
      </div>
      <div className="flex gap-2 items-center relative ">
        <BsThreeDots onClick={() => setActionsOpen(!actionsOpen)} />
        {actionsOpen && <ActionsModal unmount={setActionsOpen} />}
      </div>
    </div>
  );
}
