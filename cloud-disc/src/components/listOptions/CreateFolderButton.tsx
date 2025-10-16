"use client";
import { useModalStore } from "@/store/modalStore";
import { BiFolderPlus } from "react-icons/bi";
import FolderCreateModalWindow from "../modalPage/FolderCreateModalWindow";

export default function CreateFolderButton() {
  const { setModalContent } = useModalStore();
  return (
    <button
      onClick={() => {
        setModalContent(<FolderCreateModalWindow />);
      }}
      className="bg-white p-4 py-2 h-fit rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center space-x-3"
    >
      <div className="w-10 bg-blue-100 p-2 rounded-lg flex items-center justify-center">
        <BiFolderPlus className="w-5 h-5 text-blue-600" />
      </div>
      <span className="font-medium text-gray-700">Новая папка</span>
    </button>
  );
}
