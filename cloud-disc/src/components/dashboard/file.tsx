import {
  FaEdit,
  FaFile,
  FaFileAudio,
  FaFolder,
  FaList,
  FaTrash,
} from "react-icons/fa";
import { FaFileVideo } from "react-icons/fa";
export default function File({ type, name }: { type: string; name: string }) {
  const IconType = () => {
    switch (type) {
      case "file":
        return <FaFile className="h-5 w-5" />;
      case "video":
        return <FaFileVideo className="h-5 w-5" />;
      case "audio":
        return <FaFileAudio className="h-5 w-5" />;
      case "folder":
        return <FaFolder className="h-5 w-5" />;
      default:
        return <FaList className="h-5 w-5" />;
    }
  };

  return (
    <div className="w-full hover:cursor-pointer rounded-2xl px-4 inset-shadow-2xs hover:inset-shadow-gray-00 inset-shadow-white hover:ring-gray-200 hover:ring-2 transition-all duration-500 h-10 flex items-center justify-between gap-3 p-1 ring-1">
      <div className="flex gap-2 items-center">
        {IconType()} <p className="font-semibold">{name}</p>
      </div>
      <div className="flex gap-2 items-center">
        <FaEdit className="h-4 w-4 box-content p-1 hover:cursor-pointer rounded-xl bg-gray-300" />
        <FaTrash className="h-4 w-4 box-content p-1 hover:cursor-pointer rounded-xl bg-red-300" />
      </div>
    </div>
  );
}
