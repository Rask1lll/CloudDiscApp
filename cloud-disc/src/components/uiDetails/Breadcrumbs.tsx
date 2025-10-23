"use client";
import { useFileStore } from "@/store/fileStore";
import { useRouter } from "next/navigation";
import { BsBack, BsBackpack, BsBackspace } from "react-icons/bs";
import { IoFolderOutline } from "react-icons/io5";

export default function Breadcrumbs() {
  const router = useRouter();
  const { currentFolderName } = useFileStore();
  return (
    <div className="flex gap-1">
      <button
        className="bg-white cursor-pointer gap-1 p-0.5 px-2 h-fit rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center space-x-3"
        onClick={() => {
          router.back();
        }}
      >
        <BsBackspace />
        Назад
      </button>

      <div className="bg-white p-0.5 gap-1.5 px-2 h-fit rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center space-x-3">
        <div className="bg-blue-200 rounded-2xl">
          <IoFolderOutline />
        </div>
        {currentFolderName}
      </div>
    </div>
  );
}
