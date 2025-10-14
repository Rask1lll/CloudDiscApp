import CreateFolderButton from "./CreateFolderButton";
import Search from "./Search";
import UploadFileButton from "./UploadFileButton";

export default function ListOptions() {
  return (
    <div className="w-full flex mb-2">
      <div className="flex not-md:flex-col gap-4 w-full">
        <Search />
        <div className="flex gap-2">
          <CreateFolderButton />
          <UploadFileButton />
        </div>
      </div>
    </div>
  );
}
