"use client";
import { useUserStore } from "@/store/userStore";
import CreateFolderButton from "./CreateFolderButton";
import Search from "./Search";
import UploadFileButton from "./UploadFileButton";

export default function ListOptions() {
  const { status } = useUserStore();

  return (
    <div className="w-full flex mb-2">
      <div className="flex not-md:flex-col gap-4 w-full">
        <Search />
        {status && (
          <div className="flex gap-2">
            <CreateFolderButton />
            <UploadFileButton />
          </div>
        )}
      </div>
    </div>
  );
}
