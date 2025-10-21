"use client";
import { AiOutlineAudio, AiOutlineFileText } from "react-icons/ai";
import { HiOutlineVideoCamera, HiOutlineDocument } from "react-icons/hi";
import { IoImageOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useModalStore } from "@/store/modalStore";
import ActionsModal from "./ActionsModal";
import VideoFileModalWindow from "../modalPage/VideoFileModalWindow";
import AudioFileModalWindow from "../modalPage/AudioFileModalWindow";
import ImageFileModalWindow from "../modalPage/ImageFileModalWindow";
import FileModalWindow from "../modalPage/FileModalWindow";

export default function File({
  fileId,
  type,
  name,
  createDate,
  size,
  fileToken,
}: any) {
  const { setModalContent } = useModalStore();
  const { status } = useUserStore();
  const [actionsOpen, setActionsOpen] = useState(false);

  const IconType = () => {
    if (type.includes("video"))
      return <HiOutlineVideoCamera className="h-5 text-orange-400 w-5" />;
    switch (type) {
      case "document":
        return <AiOutlineFileText className="h-5 text-green-600 w-5" />;
      case "audio":
        return <AiOutlineAudio className="h-5 text-sky-600 w-5" />;
      case "image":
        return <IoImageOutline className="h-5 text-purple-600 w-5" />;
      default:
        return <HiOutlineDocument className="h-5 text-gray-600 w-5" />;
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    const kb = bytes / 1024;
    if (kb < 1024) return kb.toFixed(1) + " KB";
    const mb = kb / 1024;
    if (mb < 1024) return mb.toFixed(1) + " MB";
    return (mb / 1024).toFixed(1) + " GB";
  };

  const ModalType = () => {
    if (type.includes("video"))
      return <VideoFileModalWindow name={name} fileToken={fileToken} />;
    switch (type) {
      case "audio":
        return <AudioFileModalWindow name={name} fileToken={fileToken} />;
      case "image":
        return <ImageFileModalWindow name={name} fileToken={fileToken} />;
      default:
        return <FileModalWindow name={name} type={type} />;
    }
  };

  return (
    <div
      onClick={() => setModalContent(ModalType())}
      className={`grid items-center border-b border-gray-100 hover:bg-gray-50 transition-all px-5 py-3 cursor-pointer 
      ${
        status
          ? "grid-cols-[40px_2fr_1fr_1fr_1fr_100px] not-md:grid-cols-[40px_7fr_1fr_10px]"
          : "grid-cols-[40px_2fr_1fr_1fr_1fr] not-md:grid-cols-[40px_1fr_10px]"
      }`}
    >
      <div>{IconType()}</div>

      <div className="truncate text-gray-900 font-medium flex flex-col">
        <span>{name}</span>
        <div className="flex md:hidden text-sm text-gray-500 gap-2 mt-1">
          <span>{formatSize(size)}</span>
          <span>{new Date(createDate).toLocaleDateString("ru-RU")}</span>
        </div>
      </div>

      <div className="hidden md:block text-gray-500">{type}</div>

      <div className="hidden md:block text-gray-500">{formatSize(size)}</div>

      <div className="hidden md:block text-gray-500">
        {new Date(createDate).toLocaleDateString("ru-RU")}
      </div>

      {status && (
        <div
          className="
            relative 
            flex 
            justify-end 
            md:justify-end 
            pr-2 
            md:pr-5
          "
        >
          <BsThreeDots
            onClick={(e) => {
              e.stopPropagation();
              setActionsOpen(!actionsOpen);
            }}
            className="cursor-pointer text-gray-700"
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
  );
}
