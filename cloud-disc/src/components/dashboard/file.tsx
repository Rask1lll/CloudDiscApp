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
  const { setModalContent } = useModalStore();
  const { status } = useUserStore();
  const [actionsOpen, setActionsOpen] = useState<Boolean>(false);
  const IconType = () => {
    switch (type) {
      case "file":
        return <AiOutlineFileText className="h-5 text-green-600 w-5" />;
      case "video":
        return <HiOutlineVideoCamera className="h-5 text-orange-400 w-5" />;
      case "audio":
        return <AiOutlineAudio className="h-5 text-sky-600 w-5" />;
      case "folder":
        return <AiOutlineFolder className="h-5  w-5" />;
      case "image":
        return <IoImageOutline className="h-5 text-purple-600 w-5" />;
      default:
        return <HiOutlineDocument className="h-5 w-5" />;
    }
  };

  const ModalType = () => {
    switch (type) {
      case "video":
        return <VideoFileModalWindow name={name} link="/audio.mp3" />;
      case "audio":
        return <AudioFileModalWindow name={name} link="/audio.mp3" />;
      case "image":
        return <ImageFileModalWindow name={name} link="/image.jpeg" />;
      default:
        return <FileModalWindow name={name} type={type} />;
    }
  };

  return (
    <div
      onClick={() => {
        setModalContent(ModalType());
      }}
      className=" w-full hover:cursor-pointer hover:bg-gray-50 p-4 not-last:border-b border-gray-100 transition-all duration-500  flex items-center justify-between gap-3 "
    >
      <div className="flex gap-2 items-center w-[50%] not-sm:w-[100%] whitespace-nowrap">
        {IconType()}{" "}
        <h3 className="font-medium text-gray-900 overflow-ellipsis  line-clamp-1 md:line-clamp-2 max-w-[70%]">
          {name}
          <div className="flex gap-2 text-sm md:hidden text-gray-500">
            <span>{size}</span>
            <span>{createDate}</span>
          </div>
        </h3>
      </div>

      <div
        className={`flex gap-2 ${
          !status && "mx-auto"
        } text-base not-md:hidden text-gray-500`}
      >
        <span>{type}</span>
      </div>
      <div
        className={`flex gap-2 ${
          !status && "mx-auto"
        } text-base not-md:hidden text-gray-500`}
      >
        <span>{size}</span>|<span>{createDate}</span>
      </div>
      {status && (
        <div className="flex gap-2 items-center relative ">
          <BsThreeDots
            onClick={(e) => {
              e.stopPropagation();
              setActionsOpen(!actionsOpen);
            }}
          />
          {actionsOpen && (
            <ActionsModal fileName={name} unmount={setActionsOpen} />
          )}
        </div>
      )}
    </div>
  );
}
