"use client";
import { useModalStore } from "@/store/modalStore";
import { BiUpload } from "react-icons/bi";
import UploadFileModalWindow from "../modalPage/UploadFileModalWindow";

export default function UploadFileButton() {
  const { setModalContent } = useModalStore();
  return (
    <button
      onClick={() => {
        setModalContent(<UploadFileModalWindow />);
      }}
      className="bg-white p-4 py-2 h-fit rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center space-x-3"
    >
      <div className="w-10 p-2 bg-purple-100 rounded-lg flex items-center justify-center">
        <BiUpload className="w-5 h-5 text-purple-600" />
      </div>
      <span className="font-medium text-gray-700">Загрузить</span>
    </button>
  );
}
