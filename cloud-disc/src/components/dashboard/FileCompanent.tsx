"use client";
import { useState } from "react";
import {
  AiOutlineAudio,
  AiOutlineFileText,
  AiOutlineFolder,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineDocument, HiOutlineVideoCamera } from "react-icons/hi";
import ActionsModal from "./ActionsModal";
import { useModalStore } from "@/store/modalStore";
import AudioFileModalWindow from "../modalPage/AudioFileModalWindow";
import VideoFileModalWindow from "../modalPage/VideoFileModalWindow";
import { useUserStore } from "@/store/userStore";
import { IoImageOutline } from "react-icons/io5";
import FileModalWindow from "../modalPage/FileModalWindow";
import ImageFileModalWindow from "../modalPage/ImageFileModalWindow";
import DocumentModalWindow from "../modalPage/DocumentModalWindow";

export default function File({
  fileId,
  type,
  name,
  createDate,
  size,
  updateAt,
  fileToken,
}: {
  fileId: string;
  type: string;
  name: string;
  createDate: Date;
  size: number | string;
  updateAt: Date;
  fileToken: string;
}) {
  const { setModalContent } = useModalStore();
  const { status } = useUserStore();
  const [actionsOpen, setActionsOpen] = useState<Boolean>(false);

  const IconType = () => {
    if (type.includes("video"))
      return <HiOutlineVideoCamera className="h-5 text-orange-400 w-5" />;
    switch (type) {
      case "document":
        return <AiOutlineFileText className="h-5 text-green-600 w-5" />;
      case "audio":
        return <AiOutlineAudio className="h-5 text-sky-600 w-5" />;
      case "folder":
        return <AiOutlineFolder className="h-5 w-5" />;
      case "image":
        return <IoImageOutline className="h-5 text-purple-600 w-5" />;
      default:
        return <HiOutlineDocument className="h-5 w-5" />;
    }
  };

  const ModalType = () => {
    if (type.includes("video"))
      return <VideoFileModalWindow name={name} fileToken={fileToken} />;
    switch (type) {
      case "audio":
        return <AudioFileModalWindow name={name} fileToken={fileToken} />;
      case "image":
        return <ImageFileModalWindow name={name} fileToken={fileToken} />;
      case "document":
        return <DocumentModalWindow name={name} fileToken={fileToken} />;
      default:
        return <FileModalWindow name={name} type={type} />;
    }
  };

  const formatSize = (bytes: number | string) => {
    const b = typeof bytes === "string" ? parseInt(bytes) : bytes;
    if (b < 1024) return b + " B";
    const kb = b / 1024;
    if (kb < 1024) return kb.toFixed(2) + " KB";
    const mb = kb / 1024;
    if (mb < 1024) return mb.toFixed(2) + " MB";
    const gb = mb / 1024;
    return gb.toFixed(2) + " GB";
  };

  return (
    <div
      onClick={() => {
        setModalContent(ModalType());
      }}
      className="w-full hover:cursor-pointer hover:bg-gray-50 p-4 not-last:border-b border-gray-100 transition-all duration-500 flex items-center justify-between gap-3"
    >
      <div className="flex gap-2 items-center w-[40%] not-md:w-[100%] whitespace-nowrap">
        <div className="w-[5%]">{IconType()} </div>
        <h3 className="font-medium text-gray-900 overflow-ellipsis line-clamp-1 md:line-clamp-2 not-md:w-[75%] w-[95%]">
          {name}
          <div className="flex gap-2 text-sm md:hidden text-gray-500">
            <span className="text-nowrap">{formatSize(size)}</span>
            <span>{createDate.toLocaleDateString("ru-RU")}</span>
          </div>
        </h3>
      </div>
      <div
        className={`md:w-[60%] not-md:justify-end text-base ${
          !status ? "mr-14" : "md:ml-28"
        } flex justify-between`}
      >
        <div
          className={`flex not-md:hidden w-[10%] gap-2 ${
            !status ? "mx-auto" : "mr-8"
          } text-gray-500`}
        >
          <span>{type}</span>
        </div>
        <div
          className={`flex not-md:hidden w-[60%] ${
            status && "w-[%]"
          } gap-20 text-gray-500`}
        >
          <span className={`w-[70px] not-md:hidden`}>{formatSize(size)}</span>
          <span className="not-md:hidden">
            {createDate.toLocaleDateString("ru-RU")}
          </span>
        </div>
        {status && (
          <div className="flex gap-2 items-center relative">
            <BsThreeDots
              onClick={(e) => {
                e.stopPropagation();
                setActionsOpen(!actionsOpen);
              }}
            />
            {actionsOpen && (
              <ActionsModal
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
  );
}
