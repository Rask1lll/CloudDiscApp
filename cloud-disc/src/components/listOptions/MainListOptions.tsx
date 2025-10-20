"use client";
import { useUserStore } from "@/store/userStore";
import CreateFolderButton from "./CreateFolderButton";
import Search from "./Search";
import UploadFileButton from "./UploadFileButton";
import SortFilesCheckbox from "./SortingSelect";

export default function MainListOptions() {
  const { status } = useUserStore();

  return (
    <div className="w-full flex mb-2">
      <div className="flex not-md:flex-col gap-4 w-full">
        <div className="flex gap-2 not-sm:flex-col flex-1">
          <Search />
          <SortFilesCheckbox />
        </div>
        {status && (
          <div className="flex gap-2">
            <CreateFolderButton />
          </div>
        )}
      </div>
    </div>
  );
}
